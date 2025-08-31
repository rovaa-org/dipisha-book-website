import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { setCookie } from 'hono/cookie';
import { sign } from 'hono/jwt';
import { drizzle } from 'drizzle-orm/d1';
import { posts } from '@dipisha/database';
import { eq, like, and } from 'drizzle-orm';
import type { D1Database, R2Bucket} from "@cloudflare/workers-types";

// This defines the structure of our environment variables
// We'll need to create a .dev.vars file for wrangler to use these locally
type Bindings = {
	JWT_SECRET: string;
	ADMIN_EMAIL: string;
	ADMIN_PASS_HASH: string;
	DB: D1Database;
	R2: R2Bucket;
};
type Variables = {
	db: ReturnType<typeof drizzle>;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();
app.use('/api/*', cors({
	allowMethods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
	origin: '*',
	credentials: true,
}))

app.use('/api/*', async (c, next) => {
	const db = drizzle(c.env.DB);
	c.set('db', db);
	await next();
});


// --- LOGIN ROUTE ---
app.post('/api/login', async (c) => {
	const { email, password } = await c.req.json();

	// In a real app, you would hash the incoming password and compare it to the stored hash.
	// For now, we'll do a simple string comparison for demonstration.
	// We'll replace this with a proper hash check later.
	if (email !== c.env.ADMIN_EMAIL || password !== c.env.ADMIN_PASS_HASH) {
		return c.json({ error: 'Invalid credentials' }, 401);
	}

	// Credentials are valid, create a JWT payload
	const payload = {
		sub: email, // Subject (the user)
		role: 'admin',
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expires in 7 days
	};

	const token = await sign(payload, c.env.JWT_SECRET);

	setCookie(c, 'auth_session', token, {
		path: '/',
		secure: true, // Only send over HTTPS
		httpOnly: true, // Cannot be accessed by client-side JS
		maxAge: 604800, // 7 days in seconds
		sameSite: 'Strict', // Protection against CSRF
	});

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

app.post('/api/uploads/presign', async (c) => {
    const { fileType } = await c.req.json<{ fileType: string }>();
    const { BUCKET_NAME, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = env(c);

    // This logic would ideally be more robust, but is fine for now
    const signedUrl = await handle(
        {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
            bucket: BUCKET_NAME,
            endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        },
        'presign',
        `image-${Date.now()}.${fileType.split('/')[1]}`, // e.g. image-1629381923.png
        {
            aws: {
                expiresIn: 3600, // 1 hour
                region: 'auto',
            },
            method: 'PUT',
        }
    );

    return c.json({ signedUrl });
});

export default app;