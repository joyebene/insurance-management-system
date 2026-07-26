
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebase-token');
  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith('/dashboard/admin') || path.startsWith('/analytics')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Additional role check would go here
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/analytics/:path*'],
};