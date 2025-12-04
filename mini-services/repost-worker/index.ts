import cron from 'node-cron'
import { PrismaClient } from '@prisma/client'
import { JobStatus, PostStatus } from '@prisma/client'
import { PlatformAdapterFactory, EnhancedRepostWorker } from '../../src/lib/platform-adapters'

const prisma = new PrismaClient()
const enhancedWorker = new EnhancedRepostWorker()

class RepostWorker {
  async processJob(job: any) {
    return await enhancedWorker.processJob(job)
  }
  
  async processPendingJobs() {
    console.log('Processing pending jobs...')
    
    const pendingJobs = await prisma.repostJob.findMany({
      where: {
        status: {
          in: [JobStatus.PENDING, JobStatus.RETRYING]
        },
        scheduledAt: {
          lte: new Date()
        }
      },
      include: {
        listing: {
          include: {
            media: {
              orderBy: { order: 'asc' }
            }
          }
        },
        platform: true,
        account: true
      },
      take: 10 // Process 10 jobs at a time
    })
    
    console.log(`Found ${pendingJobs.length} pending jobs`)
    
    for (const job of pendingJobs) {
      await this.processJob(job)
    }
  }
  
  async processRecurringJobs() {
    console.log('Processing recurring jobs...')
    
    // Find jobs that need to be rescheduled
    const recurringJobs = await prisma.repostJob.findMany({
      where: {
        config: {
          path: ['recurring'],
          equals: true
        },
        status: JobStatus.COMPLETED,
        listing: {
          status: 'ACTIVE'
        }
      },
      include: {
        listing: true,
        platform: true,
        account: true
      }
    })
    
    console.log(`Found ${recurringJobs.length} recurring jobs to reschedule`)
    
    for (const job of recurringJobs) {
      const config = job.config as any
      const recurringConfig = config.recurringConfig || { frequency: 'daily' }
      
      // Calculate next scheduled time
      const nextScheduledAt = this.calculateNextSchedule(job.completedAt || new Date(), recurringConfig.frequency)
      
      // Create new job
      await prisma.repostJob.create({
        data: {
          listingId: job.listingId,
          platformId: job.platformId,
          accountId: job.accountId,
          status: JobStatus.PENDING,
          scheduledAt: nextScheduledAt,
          config: job.config
        }
      })
      
      console.log(`Created recurring job for listing ${job.listingId}, scheduled for ${nextScheduledAt}`)
    }
  }
  
  calculateNextSchedule(lastRun: Date, frequency: string): Date {
    const next = new Date(lastRun)
    
    switch (frequency) {
      case 'hourly':
        next.setHours(next.getHours() + 1)
        break
      case 'daily':
        next.setDate(next.getDate() + 1)
        break
      case 'weekly':
        next.setDate(next.getDate() + 7)
        break
      case 'monthly':
        next.setMonth(next.getMonth() + 1)
        break
      default:
        next.setDate(next.getDate() + 1)
    }
    
    return next
  }
  
  async cleanupOldJobs() {
    console.log('Cleaning up old jobs...')
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    // Delete old failed and completed jobs
    const deletedCount = await prisma.repostJob.deleteMany({
      where: {
        status: {
          in: [JobStatus.FAILED, JobStatus.COMPLETED, JobStatus.CANCELLED]
        },
        completedAt: {
          lt: thirtyDaysAgo
        }
      }
    })
    
    console.log(`Deleted ${deletedCount.count} old jobs`)
  }
  
  start() {
    console.log('Starting Repost Worker...')
    
    // Process pending jobs every minute
    cron.schedule('* * * * *', async () => {
      try {
        await this.processPendingJobs()
      } catch (error) {
        console.error('Error processing pending jobs:', error)
      }
    })
    
    // Process recurring jobs every hour
    cron.schedule('0 * * * *', async () => {
      try {
        await this.processRecurringJobs()
      } catch (error) {
        console.error('Error processing recurring jobs:', error)
      }
    })
    
    // Cleanup old jobs daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      try {
        await this.cleanupOldJobs()
      } catch (error) {
        console.error('Error cleaning up old jobs:', error)
      }
    })
    
    console.log('Repost Worker started successfully')
  }
}

// Start the worker
const worker = new RepostWorker()
worker.start()

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down Repost Worker...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Shutting down Repost Worker...')
  await prisma.$disconnect()
  process.exit(0)
})