import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'ivanpogi')

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload
  } catch (err) {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminToken = request.cookies.get('adminToken')?.value
  const userToken = request.cookies.get('auth_token')?.value

  // Admin route protection
  if (pathname.startsWith('/admin/dashboard')) {
    if (!adminToken) return NextResponse.redirect(new URL('/admin', request.url))

    const payload = await verifyJWT(adminToken)
    if (!payload || (payload.role !== 'admin' && payload.role !== 'SUPER_ADMIN')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
  }

  // User route protection
  if (
    pathname.startsWith('/shop/checkout') ||
    pathname.startsWith('/shop/cart') ||
    pathname.startsWith('/shop/myAccount')
  ) {
    if (!userToken) return NextResponse.redirect(new URL('/login', request.url))

    const payload = await verifyJWT(userToken)
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/shop/checkout',
    '/shop/cart',
    '/shop/myAccount',
  ],
}
