import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin/dashboard and all sub-routes
  if (pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get('finbud_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Redirect /admin → /admin/dashboard if logged in
  if (pathname === '/admin') {
    const token = req.cookies.get('finbud_token')?.value;
    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
