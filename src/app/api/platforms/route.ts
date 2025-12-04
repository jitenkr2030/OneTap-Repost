import { NextRequest, NextResponse } from 'next/server'
import { AdapterFactory } from '@/lib/adapters/factory'
import { PlatformConfig, PlatformPost } from '@/lib/adapters/base'

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { platformType, action, data } = await request.json()

    if (!platformType || !action) {
      return NextResponse.json(
        { error: 'Platform type and action are required' },
        { status: 400 }
      )
    }

    // Check if platform is supported
    if (!AdapterFactory.isPlatformSupported(platformType)) {
      return NextResponse.json(
        { error: `Unsupported platform: ${platformType}` },
        { status: 400 }
      )
    }

    // Get platform configuration
    const platformConfig = AdapterFactory.getAdapterConfig(platformType)
    
    // Add user-specific configuration (in real implementation, this would come from database)
    const config: PlatformConfig = {
      ...platformConfig,
      clientId: process.env[`${platformType.toUpperCase()}_CLIENT_ID`],
      clientSecret: process.env[`${platformType.toUpperCase()}_CLIENT_SECRET`],
      redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback/${platformType}`
    }

    // Create adapter instance
    const adapter = AdapterFactory.createAdapter(platformType, config)

    let result

    switch (action) {
      case 'authenticate':
        const { authCode } = data
        if (!authCode) {
          return NextResponse.json(
            { error: 'Auth code is required for authentication' },
            { status: 400 }
          )
        }
        result = await adapter.authenticate(authCode)
        break

      case 'post':
        const postData: PlatformPost = data.post
        if (!postData) {
          return NextResponse.json(
            { error: 'Post data is required for posting' },
            { status: 400 }
          )
        }
        result = await adapter.postListing(postData)
        break

      case 'update':
        const { postId, updates } = data
        if (!postId || !updates) {
          return NextResponse.json(
            { error: 'Post ID and updates are required for updating' },
            { status: 400 }
          )
        }
        result = await adapter.updatePost(postId, updates)
        break

      case 'delete':
        const { postId: deletePostId } = data
        if (!deletePostId) {
          return NextResponse.json(
            { error: 'Post ID is required for deletion' },
            { status: 400 }
          )
        }
        result = await adapter.deletePost(deletePostId)
        break

      case 'stats':
        const { postId: statsPostId } = data
        if (!statsPostId) {
          return NextResponse.json(
            { error: 'Post ID is required for stats' },
            { status: 400 }
          )
        }
        result = await adapter.getPostStats(statsPostId)
        break

      case 'auth_url':
        const authUrl = adapter.getAuthUrl()
        result = { authUrl }
        break

      default:
        return NextResponse.json(
          { error: `Unsupported action: ${action}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      platform: platformType,
      action,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Platform API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platformType = searchParams.get('platform')

    if (platformType) {
      // Get specific platform info
      if (!AdapterFactory.isPlatformSupported(platformType)) {
        return NextResponse.json(
          { error: `Unsupported platform: ${platformType}` },
          { status: 400 }
        )
      }

      const config = AdapterFactory.getAdapterConfig(platformType)
      return NextResponse.json({
        platform: platformType,
        supported: true,
        config,
        features: ['authenticate', 'post', 'update', 'delete', 'stats']
      })
    }

    // Get all supported platforms
    const supportedPlatforms = AdapterFactory.getSupportedPlatforms()
    const platformsInfo = supportedPlatforms.map(platform => ({
      platform,
      supported: true,
      config: AdapterFactory.getAdapterConfig(platform),
      features: ['authenticate', 'post', 'update', 'delete', 'stats']
    }))

    return NextResponse.json({
      platforms: platformsInfo,
      count: platformsInfo.length
    })

  } catch (error) {
    console.error('Platform info fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}