import { NextRequest, NextResponse } from 'next/server';

const CORRECT_PASSWORD = 'KademLawliet0521@';
const AUTH_COOKIE_NAME = 'lawliet_bypass_auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = body.password;

    if (password === CORRECT_PASSWORD) {
      const response = NextResponse.json({ success: true });
      // Set auth cookie that expires in 1 day
      response.cookies.set(AUTH_COOKIE_NAME, 'true', {
        path: '/',
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
