import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { ListingStatus, Category, MediaType } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    // Get user from headers (set by middleware)
    const userId = request.headers.get('user-id')
    const userEmail = request.headers.get('user-email')

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as Category
    const price = formData.get('price') ? parseFloat(formData.get('price') as string) : null
    const location = formData.get('location') as string
    const latitude = formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null
    const longitude = formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null
    const platforms = JSON.parse(formData.get('platforms') as string) as string[]
    const scheduleType = formData.get('scheduleType') as string
    const scheduleTime = formData.get('scheduleTime') as string

    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      )
    }

    // Check user subscription quota
    const userSubscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      }
    })

    if (!userSubscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 403 }
      )
    }

    if (userSubscription.quota && userSubscription.quotaUsed >= userSubscription.quota) {
      return NextResponse.json(
        { error: 'Quota exceeded. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Handle file uploads
    const mediaFiles = formData.getAll('media') as File[]
    const mediaUrls: string[] = []

    for (const file of mediaFiles) {
      // In a real implementation, you would upload to cloud storage
      // For now, we'll simulate it
      const fileName = `${Date.now()}-${file.name}`
      const fileUrl = `/uploads/${fileName}` // Simulated URL
      mediaUrls.push(fileUrl)
    }

    // Create listing
    const listing = await db.listing.create({
      data: {
        title,
        description,
        category,
        price,
        location,
        latitude,
        longitude,
        status: ListingStatus.ACTIVE,
        userId: userId
      }
    })

    // Create media records
    for (let i = 0; i < mediaUrls.length; i++) {
      const file = mediaFiles[i]
      await db.listingMedia.create({
        data: {
          listingId: listing.id,
          url: mediaUrls[i],
          type: file.type.startsWith('image/') ? MediaType.IMAGE : 
                file.type.startsWith('video/') ? MediaType.VIDEO : MediaType.DOCUMENT,
          order: i
        }
      })
    }

    // Create repost jobs for each platform
    const repostJobs = []
    for (const platformId of platforms) {
      // Get platform account for this user
      const platformAccount = await db.platformAccount.findFirst({
        where: {
          userId: userId,
          platformId: platformId,
          status: 'ACTIVE'
        }
      })

      if (!platformAccount) {
        console.warn(`No active account found for platform ${platformId}`)
        continue
      }

      // Determine scheduled time
      let scheduledAt: Date | null = null
      if (scheduleType === 'later' && scheduleTime) {
        scheduledAt = new Date(scheduleTime)
      } else if (scheduleType === 'now') {
        scheduledAt = new Date()
      }

      const repostJob = await db.repostJob.create({
        data: {
          listingId: listing.id,
          platformId: platformId,
          accountId: platformAccount.id,
          status: 'PENDING',
          scheduledAt,
          config: {
            scheduleType,
            recurring: scheduleType === 'recurring'
          }
        }
      })

      repostJobs.push(repostJob)
    }

    // Update subscription quota
    await db.subscription.update({
      where: { id: userSubscription.id },
      data: {
        quotaUsed: userSubscription.quotaUsed + platforms.length
      }
    })

    // Create analytics record for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await db.analytics.upsert({
      where: {
        userId_date: {
          userId: userId,
          date: today
        }
      },
      update: {
        listingsPosted: {
          increment: 1
        }
      },
      create: {
        userId: userId,
        date: today,
        listingsPosted: 1
      }
    })

    return NextResponse.json({
      message: 'Listing created successfully',
      listing: {
        id: listing.id,
        title: listing.title,
        category: listing.category,
        status: listing.status,
        createdAt: listing.createdAt,
        mediaCount: mediaUrls.length,
        platformsCount: repostJobs.length,
        scheduledJobs: repostJobs.length
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Listing creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    const skip = (page - 1) * limit

    const where: any = {
      userId: userId
    }

    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    const [listings, total] = await Promise.all([
      db.listing.findMany({
        where,
        include: {
          media: {
            orderBy: { order: 'asc' }
          },
          platformPosts: {
            include: {
              platform: true
            }
          },
          repostJobs: {
            include: {
              platform: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.listing.count({ where })
    ])

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Listings fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}