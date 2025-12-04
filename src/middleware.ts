import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get('auth-token')?.value

  // If no token, redirect to login for protected routes
  if (!token) {
    const protectedPaths = ['/dashboard', '/listings', '/profile', '/settings']
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )
    
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      email: string
      role: string
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!user || user.status !== 'ACTIVE') {
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0
      })
      return response
    }

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user-id', user.id)
    requestHeaders.set('user-email', user.email)
    requestHeaders.set('user-role', user.role)

    // Add subscription info
    const activeSubscription = user.subscriptions[0]
    if (activeSubscription) {
      requestHeaders.set('subscription-plan', activeSubscription.planId)
      requestHeaders.set('subscription-quota', activeSubscription.quota?.toString() || '0')
      requestHeaders.set('subscription-quota-used', activeSubscription.quotaUsed?.toString() || '0')
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

  } catch (error) {
    // Invalid token
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    })
    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}