import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { setCookie, getCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';

// This defines the structure of our environment variables
// We'll need to create a .dev.vars file for wrangler to use these locally
type Bindings = {
	JWT_SECRET: string;
	ADMIN_EMAIL: string;
	ADMIN_PASS_HASH: string; // IMPORTANT: We'll store a hash, not the plaintext password.
};

const app = new Hono<{ Bindings: Bindings }>();
app.use('/api/*', cors({
	allowMethods: ["GET", "POST", "OPTIONS", "DELETE"],
	origin: '*',
	credentials: true,
}))
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

export default app;
