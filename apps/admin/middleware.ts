import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'this-is-a-super-secret-key-for-local-development');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_session')?.value;
  const { pathname } = req.nextUrl;

  // If the user is trying to access the login page
  if (pathname.startsWith('/login')) {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        // If token is valid, redirect to dashboard
        console.log('[Middleware] Valid token on /login, redirecting to /');
        return NextResponse.redirect(new URL('/', req.url));
      } catch (error) {
        // If token is invalid, let them proceed to login
        console.log('[Middleware] Invalid token on /login, proceeding.');
        return NextResponse.next();
      }
    }
    // If no token, let them proceed to login
    return NextResponse.next();
  }

  // For any other page, verify the token
  if (!token) {
    console.log('[Middleware] No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    // If token is valid, allow the request to proceed
    console.log(`[Middleware] Valid token for ${pathname}, proceeding.`);
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    console.log(`[Middleware] Invalid token for ${pathname}, redirecting to /login.`);
    const response = NextResponse.redirect(new URL('/login', req.url));
    // Clear the invalid cookie
    response.cookies.delete('auth_session');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};