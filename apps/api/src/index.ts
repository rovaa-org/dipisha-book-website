import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { setCookie } from 'hono/cookie';
import { sign } from 'hono/jwt';
import { drizzle } from 'drizzle-orm/d1';
import { posts } from '@dipisha/database';
import { desc, eq} from 'drizzle-orm';
import type { D1Database, R2Bucket} from "@cloudflare/workers-types";

// This defines the structure of our environment variables
// We'll need to create a .dev.vars file for wrangler to use these locally
type Bindings = {
	JWT_SECRET: string;
	ADMIN_EMAIL: string;
	ADMIN_PASS_HASH: string;
	UPLOAD_AUTH_KEY: string;
	GITHUB_PAT:string;
	DB: D1Database;
	R2: R2Bucket;
};
type Variables = {
	db: ReturnType<typeof drizzle>;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// potential management need here
const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:3001',
	'http://127.0.0.1:3001',
	'http://192.168.101.2:3001',
	'https://admin.dipishakalura.com',
	'https://dipisha-admin.deepeshkalurs.workers.dev',
	'https://dipishakalura.com'
];


app.use('/api/*', cors({
	allowMethods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
    origin: (origin, c) => {
        if (allowedOrigins.includes(origin)) {
            return origin;
        }
        return null; // Reject requests from unauthorized origins
    },
	credentials: true,
	allowHeaders: ['Content-Type', 'Authorization', 'X-Custom-Auth-Key', 'x-dipisha-filename'],
}))


app.use('/api/*', async (c, next) => {
	const db = drizzle(c.env.DB);
	c.set('db', db);
	await next();
});

const authorizeRequest = (request: Request, env: Bindings) => {
	return request.headers.get('x-custom-auth-key') === env.UPLOAD_AUTH_KEY;
};


// --- LOGIN ROUTE ---
app.post('/api/login', async (c) => {
	const { email, password } = await c.req.json();

	const isEmailMatch = email === c.env.ADMIN_EMAIL;
	const isPasswordMatch = password === c.env.ADMIN_PASS_HASH;

	if (!isEmailMatch || !isPasswordMatch) {
		// Private logs for debugging in Cloudflare Dashboard
		console.log(`[API Auth Failure] Email Match: ${isEmailMatch}, Password Match: ${isPasswordMatch}`);
		console.log(`[API Auth Failure] Received Email Length: ${email?.length}, Expected Email Length: ${c.env.ADMIN_EMAIL?.length}`);
		return c.json({ error: 'Authentication failed. Please check your credentials.' }, 401);
	}

	// Credentials are valid, create a JWT payload
	const payload = {
		sub: email, // Subject (the user)
		role: 'admin',
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expires in 7 days
	};

	const token = await sign(payload, c.env.JWT_SECRET);

	const isSecure = c.req.url.startsWith('https://');

	// Use Hono's setCookie helper for a cleaner and safer implementation
	setCookie(c, 'auth_session', token, {
		path: '/',
		domain: isSecure ? '.deepeshkalurs.workers.dev': 'http://127.0.0.1:3001',
		maxAge: 604800, // 7 days
		httpOnly: true,
		secure: isSecure, // IMPORTANT: Only set 'Secure' in HTTPS environments
		sameSite: isSecure ? 'None' : 'Lax', // 'None' requires 'Secure', 'Lax' is a safe default
	});

	console.log(`[API] Login successful. Cookie set with Secure=${isSecure}`);

	return c.json({ message: 'Logged in successfully' });
});


app.get('/api/posts', async (c) => {
	const db = c.var.db;
	try {
		const allPosts = await db.select().from(posts).all();
		return c.json(allPosts);
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to fetch posts' }, 500);
	}
});


app.get('/api/posts/:id', async (c) => {
	const db = c.var.db;
	const id = c.req.param('id');

	try {
		const post = await db.select().from(posts).where(eq(posts.id, id)).get();
		if (!post) {
			return c.json({ error: 'Post not found' }, 404);
		}
		return c.json(post);
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to fetch post' }, 500);
	}
});

app.put('/api/posts/:id', async (c) => {
	const db = c.var.db;
	const id = c.req.param('id');
	const content = await c.req.json();

	let title = 'Untitled Post';
	if (content?.content?.[0]?.content?.[0]?.text) {
		title = content.content[0].content[0].text;
	}

	const postData = {
		id,
		title,
		content,
	};

	try {
		await db
			.insert(posts)
			.values(postData)
			.onConflictDoUpdate({
				target: posts.id,
				set: {
					title: postData.title,
					content: postData.content,
					updatedAt: new Date(),
				},
			});

		return c.json({ success: true, message: 'Post saved' });
	} catch (err) {
		console.error(err);
		return c.json({ success: false, error: 'Failed to save post' }, 500);
	}
});

app.delete('/api/posts/:id', async (c) => {
	const db = c.var.db;
	const id = c.req.param('id');

	try {
		const result = await db.delete(posts).where(eq(posts.id, id)).run();

		if (result.changes === 0) {
			return c.json({ error: 'Post not found' }, 404);
		}

		return c.json({ success: true, message: 'Post deleted' });
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to delete post' }, 500);
	}
});

app.post('/api/uploads', async (c) => {
	if (!authorizeRequest(c.req.raw, c.env)) {
		return c.json({ error: 'Forbidden' }, 403);
	}

	const filename = c.req.header('x-dipisha-Filename') || `image-${Date.now()}`;
	
	try {
		const object = await c.env.R2.put(filename, c.req.raw.body, {
			httpMetadata: c.req.raw.headers,
		});

		const publicUrl = `https://pub-aa79c46eef5149deb47cea3e1ca9b261.r2.dev/${object.key}`;

		return c.json({ url: publicUrl });
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to upload image' }, 500);
	}
});

app.patch('/api/posts/:id/cover', async (c) => {
	const db = c.var.db;
	const id = c.req.param('id');
	const { coverImageUrl } = await c.req.json<{ coverImageUrl: string }>();

	if (!coverImageUrl) {
		return c.json({ error: 'Missing coverImageUrl' }, 400);
	}

	try {
		await db
			.update(posts)
			.set({ coverImageUrl: coverImageUrl, updatedAt: new Date() })
			.where(eq(posts.id, id));

		return c.json({ success: true, message: 'Cover image updated' });
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to update cover image' }, 500);
	}
});

app.patch('/api/posts/:id/status', async (c) => {
	const db = c.var.db;
	const id = c.req.param('id');
	const { status } = await c.req.json<{ status: 'published' | 'draft' }>();

	if (!status || !['published', 'draft'].includes(status)) {
		return c.json({ error: 'Invalid status' }, 400);
	}

	try {
		await db
			.update(posts)
			.set({ status: status, updatedAt: new Date() })
			.where(eq(posts.id, id));

		console.log('[API] Status Update:', { id, status });
		return c.json({ success: true, message: 'Status updated' });
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to update status' }, 500);
	}
});

// --- PUBLIC ENDPOINTS ---
app.get('/api/published-posts', async (c) => {
	const db = c.var.db;
	try {
		const publishedPosts = await db
			.select()
			.from(posts)
			.where(eq(posts.status, 'published'))
			.orderBy(desc(posts.pinned), desc(posts.createdAt))
			.all();
		return c.json(publishedPosts);
	} catch (err) {
		console.error(err);
		return c.json({ error: 'Failed to fetch published posts' }, 500);
	}
});


app.post('/api/trigger-rebuild', async (c) => {
	const owner = 'rovaa-org'; // Your GitHub username or organization
	const repo = 'dipisha-book-website'; // Your repository name
	const workflow_id = 'deploy-frontend.yml'; // The filename of the workflow
	const ref = 'main'; // The branch to deploy

	const githubToken = c.env.GITHUB_PAT;

	if (!githubToken) {
		console.error('[API] GITHUB_PAT secret is not set.');
		return c.json({ error: 'Server configuration error.' }, 500);
	}

	const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;

	try {
		const response = await fetch(dispatchUrl, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${githubToken}`,
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'Dipisha-Admin-Dashboard'
			},
			body: JSON.stringify({ ref }),
		});

		if (response.status !== 204) {
			const errorBody = await response.text();
			throw new Error(`Failed to trigger GitHub Action: ${response.status} ${errorBody}`);
		}

		return c.json({ success: true, message: 'Frontend rebuild triggered successfully.' });
	} catch (err: any) {
		console.error(err.message);
		return c.json({ error: 'Failed to trigger rebuild.' }, 500);
	}
});


app.get("/", (c) => {
 return c.json({"Healthy": "Mean Strong"});
});

export default app;