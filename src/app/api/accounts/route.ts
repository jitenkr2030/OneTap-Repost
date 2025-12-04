import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { AccountStatus, PlatformType } from '@prisma/client'

// Mock platform configurations
const platformConfigs = {
  facebook: {
    name: 'Facebook Marketplace',
    type: PlatformType.SOCIAL_MEDIA,
    baseUrl: 'https://www.facebook.com',
    apiUrl: 'https://graph.facebook.com',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scopes: ['pages_manage_posts', 'pages_read_engagement']
  },
  instagram: {
    name: 'Instagram',
    type: PlatformType.SOCIAL_MEDIA,
    baseUrl: 'https://www.instagram.com',
    apiUrl: 'https://graph.instagram.com',
    authUrl: 'https://api.instagram.com/oauth/authorize',
    scopes: ['instagram_content', 'instagram_basic']
  },
  twitter: {
    name: 'Twitter',
    type: PlatformType.SOCIAL_MEDIA,
    baseUrl: 'https://twitter.com',
    apiUrl: 'https://api.twitter.com/2',
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scopes: ['tweet.read', 'tweet.write', 'users.read']
  },
  linkedin: {
    name: 'LinkedIn',
    type: PlatformType.SOCIAL_MEDIA,
    baseUrl: 'https://www.linkedin.com',
    apiUrl: 'https://api.linkedin.com/v2',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scopes: ['r_liteprofile', 'w_member_social']
  },
  olx: {
    name: 'OLX',
    type: PlatformType.MARKETPLACE,
    baseUrl: 'https://www.olx.in',
    apiUrl: 'https://api.olx.com',
    authUrl: 'https://accounts.olx.com/oauth2/auth',
    scopes: ['ads', 'profile']
  },
  telegram: {
    name: 'Telegram',
    type: PlatformType.MESSAGING,
    baseUrl: 'https://t.me',
    apiUrl: 'https://api.telegram.org',
    authUrl: 'https://core.telegram.org',
    scopes: ['send_messages', 'manage_topics']
  },
  whatsapp: {
    name: 'WhatsApp Business',
    type: PlatformType.MESSAGING,
    baseUrl: 'https://wa.me',
    apiUrl: 'https://graph.facebook.com/v15.0/whatsapp',
    authUrl: 'https://developers.facebook.com',
    scopes: ['whatsapp_business_messaging']
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's connected accounts
    const accounts = await db.platformAccount.findMany({
      where: {
        userId: userId
      },
      include: {
        platform: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get all available platforms
    const platforms = await db.platform.findMany({
      where: {
        isActive: true
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({
      accounts,
      platforms,
      configs: platformConfigs
    })

  } catch (error) {
    console.error('Accounts fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { platformId, authCode, redirectUri } = await request.json()

    if (!platformId || !authCode) {
      return NextResponse.json(
        { error: 'Platform ID and auth code are required' },
        { status: 400 }
      )
    }

    // Get platform details
    const platform = await db.platform.findUnique({
      where: { id: platformId }
    })

    if (!platform) {
      return NextResponse.json(
        { error: 'Platform not found' },
        { status: 404 }
      )
    }

    // In a real implementation, you would exchange the auth code for access tokens
    // For now, we'll simulate the OAuth flow
    const mockTokenData = {
      access_token: `mock_access_token_${Date.now()}`,
      refresh_token: `mock_refresh_token_${Date.now()}`,
      expires_in: 3600,
      token_type: 'Bearer'
    }

    // Get user profile from platform (mock)
    const mockUserProfile = {
      id: `mock_user_id_${Date.now()}`,
      username: `user_${Math.random().toString(36).substr(2, 9)}`,
      email: `user_${Math.random().toString(36).substr(2, 9)}@example.com`,
      name: 'Mock User'
    }

    // Create or update platform account
    const account = await db.platformAccount.upsert({
      where: {
        userId_platformId: {
          userId: userId,
          platformId: platformId
        }
      },
      update: {
        token: mockTokenData.access_token,
        refreshToken: mockTokenData.refresh_token,
        status: AccountStatus.ACTIVE,
        lastSyncAt: new Date(),
        config: {
          ...mockTokenData,
          profile: mockUserProfile
        }
      },
      create: {
        userId: userId,
        platformId: platformId,
        username: mockUserProfile.username,
        email: mockUserProfile.email,
        token: mockTokenData.access_token,
        refreshToken: mockTokenData.refresh_token,
        status: AccountStatus.ACTIVE,
        lastSyncAt: new Date(),
        config: {
          ...mockTokenData,
          profile: mockUserProfile
        }
      }
    })

    return NextResponse.json({
      message: 'Account connected successfully',
      account: {
        id: account.id,
        platform: platform.name,
        username: account.username,
        status: account.status,
        connectedAt: account.createdAt
      }
    })

  } catch (error) {
    console.error('Account connection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('accountId')

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      )
    }

    // Verify account belongs to user
    const account = await db.platformAccount.findFirst({
      where: {
        id: accountId,
        userId: userId
      }
    })

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    // Delete the account
    await db.platformAccount.delete({
      where: { id: accountId }
    })

    return NextResponse.json({
      message: 'Account disconnected successfully'
    })

  } catch (error) {
    console.error('Account disconnection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}