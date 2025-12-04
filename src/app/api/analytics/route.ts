import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d' // 7d, 30d, 90d, 1y
    const listingId = searchParams.get('listingId')

    // Calculate date range based on period
    const endDate = new Date()
    const startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(startDate.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate.setDate(startDate.getDate() - 30)
    }

    // Get analytics data
    const analytics = await db.analytics.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'asc' }
    })

    // Get listings data
    const listingsWhere: any = {
      userId: userId,
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    }

    if (listingId) {
      listingsWhere.id = listingId
    }

    const listings = await db.listing.findMany({
      where: listingsWhere,
      include: {
        platformPosts: {
          include: {
            platform: true
          }
        },
        repostJobs: {
          include: {
            platform: true
          }
        },
        leads: true
      }
    })

    // Calculate aggregate metrics
    const totalListings = listings.length
    const totalViews = analytics.reduce((sum, a) => sum + a.totalViews, 0)
    const totalClicks = analytics.reduce((sum, a) => sum + a.totalClicks, 0)
    const totalLeads = analytics.reduce((sum, a) => sum + a.totalLeads, 0)
    const totalRevenue = analytics.reduce((sum, a) => sum + a.revenue, 0)
    
    const avgSuccessRate = analytics.length > 0 
      ? analytics.reduce((sum, a) => sum + a.successRate, 0) / analytics.length 
      : 0

    // Platform performance data
    const platformPerformance = listings.reduce((acc, listing) => {
      listing.platformPosts.forEach(post => {
        const platformName = post.platform.name
        if (!acc[platformName]) {
          acc[platformName] = {
            name: platformName,
            posts: 0,
            views: 0,
            clicks: 0,
            leads: 0,
            successRate: 0
          }
        }
        acc[platformName].posts += 1
        acc[platformName].views += post.views || 0
        acc[platformName].clicks += post.clicks || 0
        acc[platformName].leads += listing.leads.filter(lead => lead.platformPostId === post.id).length
      })
      return acc
    }, {} as any)

    // Calculate success rates for each platform
    Object.keys(platformPerformance).forEach(platform => {
      const data = platformPerformance[platform]
      const successfulPosts = listings.filter(listing => 
        listing.platformPosts.some(post => 
          post.platform.name === platform && post.status === 'POSTED'
        )
      ).length
      data.successRate = data.posts > 0 ? (successfulPosts / data.posts) * 100 : 0
    })

    // Time series data for charts
    const timeSeriesData = analytics.map(a => ({
      date: a.date.toISOString().split('T')[0],
      views: a.totalViews,
      clicks: a.totalClicks,
      leads: a.totalLeads,
      listingsPosted: a.listingsPosted,
      successRate: a.successRate,
      revenue: a.revenue
    }))

    // Category performance
    const categoryPerformance = listings.reduce((acc, listing) => {
      const category = listing.category
      if (!acc[category]) {
        acc[category] = {
          category,
          listings: 0,
          views: 0,
          leads: 0,
          avgSuccessRate: 0
        }
      }
      acc[category].listings += 1
      acc[category].views += listing.platformPosts.reduce((sum, post) => sum + (post.views || 0), 0)
      acc[category].leads += listing.leads.length
      return acc
    }, {} as any)

    // Calculate average success rates for categories
    Object.keys(categoryPerformance).forEach(category => {
      const data = categoryPerformance[category]
      const successfulListings = listings.filter(listing => 
        listing.category === category && 
        listing.platformPosts.some(post => post.status === 'POSTED')
      ).length
      data.avgSuccessRate = data.listings > 0 ? (successfulListings / data.listings) * 100 : 0
    })

    // Top performing listings
    const topListings = listings
      .map(listing => ({
        id: listing.id,
        title: listing.title,
        category: listing.category,
        views: listing.platformPosts.reduce((sum, post) => sum + (post.views || 0), 0),
        leads: listing.leads.length,
        platforms: listing.platformPosts.length,
        createdAt: listing.createdAt,
        successRate: listing.platformPosts.length > 0 
          ? (listing.platformPosts.filter(post => post.status === 'POSTED').length / listing.platformPosts.length) * 100 
          : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    return NextResponse.json({
      overview: {
        totalListings,
        totalViews,
        totalClicks,
        totalLeads,
        totalRevenue,
        avgSuccessRate: Math.round(avgSuccessRate * 100) / 100,
        period
      },
      platformPerformance: Object.values(platformPerformance),
      categoryPerformance: Object.values(categoryPerformance),
      timeSeriesData,
      topListings,
      listings: listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        category: listing.category,
        status: listing.status,
        createdAt: listing.createdAt,
        platformPosts: listing.platformPosts.map(post => ({
          id: post.id,
          platform: post.platform.name,
          status: post.status,
          views: post.views,
          clicks: post.clicks,
          engagement: post.engagement,
          postedAt: post.postedAt
        })),
        leads: listing.leads.map(lead => ({
          id: lead.id,
          message: lead.message,
          status: lead.status,
          createdAt: lead.createdAt
        }))
      }))
    })

  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}