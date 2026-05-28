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
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  );

  // Remove headers that might cause issues
  headers.delete('x-forwarded-for');
  headers.delete('x-forwarded-host');
  headers.delete('x-forwarded-proto');

  try {
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
      redirect: 'manual',
    });

    const newHeaders = new Headers(response.headers);

    // Handle cookies
    const setCookies = response.headers.get('set-cookie');
    if (setCookies) {
      newHeaders.set('set-cookie', setCookies);
    }

    // Remove content security policy that might block us
    newHeaders.delete('content-security-policy');
    newHeaders.delete('x-frame-options');
    newHeaders.delete('x-xss-protection');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: '/:path*',
};
