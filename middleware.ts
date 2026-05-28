import { NextRequest, NextResponse } from 'next/server';

const TARGET_URL = 'https://urbanmma.com';
const AUTH_COOKIE_NAME = 'lawliet_bypass_auth';
const CORRECT_PASSWORD = 'KademLawliet0521@';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  
  // If trying to access anything except the login page, check auth
  if (url.pathname !== '/' && url.pathname !== '/api/login') {
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Proxy the request to urbanmma if authenticated
    try {
      const targetUrl = new URL(url.pathname + url.search, TARGET_URL);
      const requestInit: RequestInit = {
        method: request.method,
        headers: new Headers(request.headers),
        redirect: 'manual'
      };
      
      // Modify headers for proxy
      requestInit.headers.set('host', targetUrl.host);
      requestInit.headers.set('referer', TARGET_URL);
      requestInit.headers.set('origin', TARGET_URL);
      requestInit.headers.delete('x-forwarded-for');
      requestInit.headers.delete('x-forwarded-host');
      requestInit.headers.delete('x-forwarded-proto');
      
      // Add request body for non-GET requests
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        const body = await request.arrayBuffer();
        requestInit.body = body;
      }
      
      const response = await fetch(targetUrl.toString(), requestInit);
      const newHeaders = new Headers(response.headers);
      
      // Remove security headers that block proxying
      newHeaders.delete('x-frame-options');
      newHeaders.delete('content-security-policy');
      newHeaders.delete('content-security-policy-report-only');
      newHeaders.delete('x-xss-protection');
      
      // Handle set-cookie headers
      const setCookieHeaders = response.headers.getSetCookie();
      newHeaders.delete('set-cookie');
      for (const cookie of setCookieHeaders) {
        newHeaders.append('set-cookie', cookie);
      }
      
      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new NextResponse('Proxy Error', { status: 500 });
    }
  }
  
  // Allow access to login page and login API
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api (we'll handle /api/login specially)
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next/static|_next/image|_next/image|favicon.ico).*)'
  ]
};
