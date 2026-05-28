import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const videoUrl = searchParams.get('video');

  if (!username && !videoUrl) {
    return NextResponse.json(
      { error: 'Please provide either a username or video URL' },
      { status: 400 }
    );
  }

  try {
    if (videoUrl) {
      // For video URLs, we'll fetch the page (this is basic and might not work perfectly due to TikTok's anti-bot)
      const response = await fetch(videoUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      const html = await response.text();
      return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (username) {
      // For usernames, fetch the profile page
      const profileUrl = `https://www.tiktok.com/@${username}`;
      const response = await fetch(profileUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      const html = await response.text();
      return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('TikTok API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TikTok content' },
      { status: 500 }
    );
  }
}
