import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification=google04e9f285795cf5b8', {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}