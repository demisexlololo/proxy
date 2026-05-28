import { NextRequest, NextResponse } from 'next/server';

const TARGET_URL = 'https://www.tiktok.com';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname + url.search, TARGET_URL);

  const headers = new Headers(request.headers);
  headers.set('host', targetUrl.host);
  headers.set('referer', TARGET_URL);
  headers.set('origin', TARGET_URL);
  headers.set(
    'user-agent',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  );
  headers.set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
  headers.set('accept-language', 'en-US,en;q=0.5');

  // Remove problematic headers
  headers.delete('x-forwarded-for');
  headers.delete('x-forwarded-host');
  headers.delete('x-forwarded-proto');
  headers.delete('x-middleware-prefetch');
  headers.delete('x-middleware-subrequest');

  try {
    const requestInit: RequestInit = {
      method: request.method,
      headers: headers,
      redirect: 'manual',
    };

    // Handle request body for non-GET requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const body = await request.arrayBuffer();
      requestInit.body = body;
    }

    const response = await fetch(targetUrl.toString(), requestInit);
    const newHeaders = new Headers(response.headers);

    // Process and forward cookies
    const setCookieHeaders = response.headers.getSetCookie();
    newHeaders.delete('set-cookie');
    for (const cookie of setCookieHeaders) {
      newHeaders.append('set-cookie', cookie);
    }

    // Remove security headers that block proxying
    newHeaders.delete('content-security-policy');
    newHeaders.delete('content-security-policy-report-only');
    newHeaders.delete('x-frame-options');
    newHeaders.delete('x-xss-protection');
    newHeaders.delete('x-content-type-options');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy Error', { status: 500 });
  }
}

export const config = {
  matcher: '/:path*',
};
