import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { JobStatus } from '@prisma/client'

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
    const listingId = searchParams.get('listingId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where: any = {
      listing: {
        userId: userId
      }
    }

    if (listingId) {
      where.listingId = listingId
    }

    if (status) {
      where.status = status
    }

    const [jobs, total] = await Promise.all([
      db.repostJob.findMany({
        where,
        include: {
          listing: {
            include: {
              media: {
                orderBy: { order: 'asc' }
              }
            }
          },
          platform: true,
          account: true,
          posts: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.repostJob.count({ where })
    ])

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Repost jobs fetch error:', error)
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

    const { listingId, platformIds, scheduleType, scheduleTime, recurringConfig } = await request.json()

    if (!listingId || !platformIds || !Array.isArray(platformIds)) {
      return NextResponse.json(
        { error: 'Listing ID and platform IDs are required' },
        { status: 400 }
      )
    }

    // Verify listing belongs to user
    const listing = await db.listing.findFirst({
      where: {
        id: listingId,
        userId: userId
      }
    })

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
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

    // Create repost jobs for each platform
    const createdJobs = []
    const quotaIncrease = platformIds.length

    for (const platformId of platformIds) {
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

      const job = await db.repostJob.create({
        data: {
          listingId: listingId,
          platformId: platformId,
          accountId: platformAccount.id,
          status: JobStatus.PENDING,
          scheduledAt,
          config: {
            scheduleType,
            recurring: scheduleType === 'recurring',
            recurringConfig: recurringConfig || null
          }
        },
        include: {
          platform: true,
          account: true
        }
      })

      createdJobs.push(job)
    }

    // Update subscription quota
    await db.subscription.update({
      where: { id: userSubscription.id },
      data: {
        quotaUsed: userSubscription.quotaUsed + quotaIncrease
      }
    })

    return NextResponse.json({
      message: 'Repost jobs created successfully',
      jobs: createdJobs,
      quotaUsed: quotaIncrease
    }, { status: 201 })

  } catch (error) {
    console.error('Repost job creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { jobId, status, scheduledAt } = await request.json()

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      )
    }

    // Verify job belongs to user
    const job = await db.repostJob.findFirst({
      where: {
        id: jobId,
        listing: {
          userId: userId
        }
      }
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Update job
    const updatedJob = await db.repostJob.update({
      where: { id: jobId },
      data: {
        ...(status && { status }),
        ...(scheduledAt && { scheduledAt: new Date(scheduledAt) })
      },
      include: {
        listing: true,
        platform: true,
        account: true,
        posts: true
      }
    })

    return NextResponse.json({
      message: 'Job updated successfully',
      job: updatedJob
    })

  } catch (error) {
    console.error('Repost job update error:', error)
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
    const jobId = searchParams.get('jobId')

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      )
    }

    // Verify job belongs to user
    const job = await db.repostJob.findFirst({
      where: {
        id: jobId,
        listing: {
          userId: userId
        }
      }
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Delete the job
    await db.repostJob.delete({
      where: { id: jobId }
    })

    return NextResponse.json({
      message: 'Job deleted successfully'
    })

  } catch (error) {
    console.error('Repost job deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}