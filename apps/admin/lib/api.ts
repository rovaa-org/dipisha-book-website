// apps/admin/lib/api.ts 
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Ensure content-type is set for POST/PUT/PATCH if a body is present
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If the token is invalid (401), redirect to login
  if (response.status === 401 && typeof window !== 'undefined') {
    window.localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }

  return response;
}