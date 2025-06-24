import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'ivanpogi';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userToken = request.cookies.get('auth_token')?.value;
  const adminToken = request.cookies.get('adminToken')?.value;

  if (pathname.startsWith('/admin/dashboard')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      jwt.verify(adminToken, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname.startsWith('/shop/checkout') || pathname.startsWith('/shop/cart') || pathname.startsWith('/shop/myAccount')) {
    if (!userToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(userToken, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/shop/checkout',
    '/shop/cart',
    '/shop/myAccount',
  ],
};
