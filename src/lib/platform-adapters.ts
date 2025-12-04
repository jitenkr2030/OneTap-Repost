import { PrismaClient } from '@prisma/client'
import { JobStatus, PostStatus } from '@prisma/client'

export interface PlatformAdapter {
  name: string
  authenticate(credentials: any): Promise<any>
  postListing(listingData: any, mediaFiles: any[]): Promise<any>
  updatePost(postId: string, updates: any): Promise<any>
  deletePost(postId: string): Promise<any>
  getPostStats(postId: string): Promise<any>
}

export interface PostData {
  title: string
  description: string
  price?: number
  location?: string
  category: string
  images: string[]
  videos?: string[]
  tags?: string[]
}

export interface AuthResult {
  success: boolean
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  error?: string
}

export interface PostResult {
  success: boolean
  postId?: string
  postUrl?: string
  error?: string
}

// Facebook Marketplace Adapter
export class FacebookAdapter implements PlatformAdapter {
  name = 'Facebook Marketplace'

  async authenticate(credentials: any): Promise<AuthResult> {
    try {
      // In a real implementation, this would use Facebook's OAuth API
      console.log('Authenticating with Facebook...')
      
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        accessToken: `fb_access_token_${Date.now()}`,
        refreshToken: `fb_refresh_token_${Date.now()}`,
        expiresIn: 3600
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Facebook authentication failed'
      }
    }
  }

  async postListing(listingData: PostData, mediaFiles: any[]): Promise<PostResult> {
    try {
      console.log('Posting to Facebook Marketplace...')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock success (90% success rate)
      if (Math.random() > 0.1) {
        const postId = `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const postUrl = `https://facebook.com/marketplace/item/${postId}`
        
        return {
          success: true,
          postId,
          postUrl
        }
      } else {
        throw new Error('Facebook API error: Invalid listing data')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Facebook posting failed'
      }
    }
  }

  async updatePost(postId: string, updates: any): Promise<PostResult> {
    try {
      console.log(`Updating Facebook post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        postId,
        postUrl: `https://facebook.com/marketplace/item/${postId}`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Facebook update failed'
      }
    }
  }

  async deletePost(postId: string): Promise<PostResult> {
    try {
      console.log(`Deleting Facebook post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Facebook deletion failed'
      }
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      console.log(`Getting stats for Facebook post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock stats
      return {
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20)
      }
    } catch (error) {
      throw error
    }
  }
}

// OLX Adapter
export class OLXAdapter implements PlatformAdapter {
  name = 'OLX'

  async authenticate(credentials: any): Promise<AuthResult> {
    try {
      console.log('Authenticating with OLX...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      return {
        success: true,
        accessToken: `olx_access_token_${Date.now()}`,
        refreshToken: `olx_refresh_token_${Date.now()}`,
        expiresIn: 7200
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'OLX authentication failed'
      }
    }
  }

  async postListing(listingData: PostData, mediaFiles: any[]): Promise<PostResult> {
    try {
      console.log('Posting to OLX...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      if (Math.random() > 0.15) {
        const postId = `olx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const postUrl = `https://olx.in/item/${postId}`
        
        return {
          success: true,
          postId,
          postUrl
        }
      } else {
        throw new Error('OLX API error: Category not supported')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'OLX posting failed'
      }
    }
  }

  async updatePost(postId: string, updates: any): Promise<PostResult> {
    try {
      console.log(`Updating OLX post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      return {
        success: true,
        postId,
        postUrl: `https://olx.in/item/${postId}`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'OLX update failed'
      }
    }
  }

  async deletePost(postId: string): Promise<PostResult> {
    try {
      console.log(`Deleting OLX post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'OLX deletion failed'
      }
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      console.log(`Getting stats for OLX post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return {
        views: Math.floor(Math.random() * 2000),
        favorites: Math.floor(Math.random() * 50),
        messages: Math.floor(Math.random() * 30)
      }
    } catch (error) {
      throw error
    }
  }
}

// Instagram Adapter
export class InstagramAdapter implements PlatformAdapter {
  name = 'Instagram'

  async authenticate(credentials: any): Promise<AuthResult> {
    try {
      console.log('Authenticating with Instagram...')
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      return {
        success: true,
        accessToken: `ig_access_token_${Date.now()}`,
        refreshToken: `ig_refresh_token_${Date.now()}`,
        expiresIn: 3600
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Instagram authentication failed'
      }
    }
  }

  async postListing(listingData: PostData, mediaFiles: any[]): Promise<PostResult> {
    try {
      console.log('Posting to Instagram...')
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      if (Math.random() > 0.2) {
        const postId = `ig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const postUrl = `https://instagram.com/p/${postId}`
        
        return {
          success: true,
          postId,
          postUrl
        }
      } else {
        throw new Error('Instagram API error: Media upload failed')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Instagram posting failed'
      }
    }
  }

  async updatePost(postId: string, updates: any): Promise<PostResult> {
    try {
      console.log(`Updating Instagram post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      return {
        success: true,
        postId,
        postUrl: `https://instagram.com/p/${postId}`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Instagram update failed'
      }
    }
  }

  async deletePost(postId: string): Promise<PostResult> {
    try {
      console.log(`Deleting Instagram post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Instagram deletion failed'
      }
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      console.log(`Getting stats for Instagram post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 600))
      
      return {
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
        saves: Math.floor(Math.random() * 80),
        shares: Math.floor(Math.random() * 40)
      }
    } catch (error) {
      throw error
    }
  }
}

// WhatsApp Business Adapter
export class WhatsAppAdapter implements PlatformAdapter {
  name = 'WhatsApp Business'

  async authenticate(credentials: any): Promise<AuthResult> {
    try {
      console.log('Authenticating with WhatsApp Business...')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return {
        success: true,
        accessToken: `wa_access_token_${Date.now()}`,
        refreshToken: `wa_refresh_token_${Date.now()}`,
        expiresIn: 86400
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'WhatsApp authentication failed'
      }
    }
  }

  async postListing(listingData: PostData, mediaFiles: any[]): Promise<PostResult> {
    try {
      console.log('Posting to WhatsApp Business...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (Math.random() > 0.05) {
        const postId = `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        return {
          success: true,
          postId,
          postUrl: `https://wa.me/${postId}`
        }
      } else {
        throw new Error('WhatsApp API error: Message not delivered')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'WhatsApp posting failed'
      }
    }
  }

  async updatePost(postId: string, updates: any): Promise<PostResult> {
    try {
      console.log(`Updating WhatsApp message ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return {
        success: true,
        postId
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'WhatsApp update failed'
      }
    }
  }

  async deletePost(postId: string): Promise<PostResult> {
    try {
      console.log(`Deleting WhatsApp message ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'WhatsApp deletion failed'
      }
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      console.log(`Getting stats for WhatsApp message ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 400))
      
      return {
        delivered: Math.random() > 0.1,
        read: Math.random() > 0.3,
        replies: Math.floor(Math.random() * 10)
      }
    } catch (error) {
      throw error
    }
  }
}

// Telegram Adapter
export class TelegramAdapter implements PlatformAdapter {
  name = 'Telegram'

  async authenticate(credentials: any): Promise<AuthResult> {
    try {
      console.log('Authenticating with Telegram...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        accessToken: `tg_access_token_${Date.now()}`,
        refreshToken: `tg_refresh_token_${Date.now()}`,
        expiresIn: 86400
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Telegram authentication failed'
      }
    }
  }

  async postListing(listingData: PostData, mediaFiles: any[]): Promise<PostResult> {
    try {
      console.log('Posting to Telegram...')
      await new Promise(resolve => setTimeout(resolve, 1800))
      
      if (Math.random() > 0.08) {
        const postId = `tg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const postUrl = `https://t.me/${postId}`
        
        return {
          success: true,
          postId,
          postUrl
        }
      } else {
        throw new Error('Telegram API error: Channel not found')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Telegram posting failed'
      }
    }
  }

  async updatePost(postId: string, updates: any): Promise<PostResult> {
    try {
      console.log(`Updating Telegram post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        postId,
        postUrl: `https://t.me/${postId}`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Telegram update failed'
      }
    }
  }

  async deletePost(postId: string): Promise<PostResult> {
    try {
      console.log(`Deleting Telegram post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Telegram deletion failed'
      }
    }
  }

  async getPostStats(postId: string): Promise<any> {
    try {
      console.log(`Getting stats for Telegram post ${postId}...`)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        views: Math.floor(Math.random() * 1500),
        forwards: Math.floor(Math.random() * 100),
        reactions: Math.floor(Math.random() * 200)
      }
    } catch (error) {
      throw error
    }
  }
}

// Platform Adapter Factory
export class PlatformAdapterFactory {
  static createAdapter(platformName: string): PlatformAdapter {
    switch (platformName.toLowerCase()) {
      case 'facebook':
      case 'facebook marketplace':
        return new FacebookAdapter()
      case 'olx':
        return new OLXAdapter()
      case 'instagram':
        return new InstagramAdapter()
      case 'whatsapp':
      case 'whatsapp business':
        return new WhatsAppAdapter()
      case 'telegram':
        return new TelegramAdapter()
      default:
        throw new Error(`Unsupported platform: ${platformName}`)
    }
  }
}

// Enhanced Repost Worker with Platform Adapters
export class EnhancedRepostWorker {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async processJob(job: any) {
    try {
      console.log(`Processing job ${job.id} for platform: ${job.platform.name}`)
      
      // Update job status to running
      await this.prisma.repostJob.update({
        where: { id: job.id },
        data: {
          status: JobStatus.RUNNING,
          startedAt: new Date(),
          attempts: {
            increment: 1
          }
        }
      })
      
      // Get platform adapter
      const adapter = PlatformAdapterFactory.createAdapter(job.platform.name)
      
      // Prepare listing data
      const listingData = {
        title: job.listing.title,
        description: job.listing.description,
        price: job.listing.price,
        location: job.listing.location,
        category: job.listing.category,
        images: job.listing.media?.filter((m: any) => m.type === 'IMAGE').map((m: any) => m.url) || [],
        videos: job.listing.media?.filter((m: any) => m.type === 'VIDEO').map((m: any) => m.url) || [],
        tags: this.generateTags(job.listing.category, job.listing.title)
      }
      
      // Post to platform
      const result = await adapter.postListing(listingData, job.listing.media || [])
      
      if (result.success) {
        // Create platform post record
        const platformPost = await this.prisma.platformPost.create({
          data: {
            listingId: job.listingId,
            platformId: job.platformId,
            accountId: job.accountId,
            repostJobId: job.id,
            externalId: result.postId,
            url: result.postUrl,
            status: PostStatus.POSTED,
            postedAt: new Date()
          }
        })
        
        // Update job status to completed
        await this.prisma.repostJob.update({
          where: { id: job.id },
          data: {
            status: JobStatus.COMPLETED,
            completedAt: new Date()
          }
        })
        
        // Get post stats after a delay
        setTimeout(async () => {
          try {
            const stats = await adapter.getPostStats(result.postId!)
            await this.updatePostStats(platformPost.id, stats)
          } catch (error) {
            console.error('Failed to get post stats:', error)
          }
        }, 5000)
        
        console.log(`Job ${job.id} completed successfully. Post ID: ${platformPost.id}`)
        
        return { success: true, postId: platformPost.id }
      } else {
        throw new Error(result.error || 'Platform posting failed')
      }
      
    } catch (error) {
      console.error(`Job ${job.id} failed:`, error)
      
      // Update job status to failed or retrying
      const newStatus = job.attempts < job.maxAttempts ? JobStatus.RETRYING : JobStatus.FAILED
      
      await this.prisma.repostJob.update({
        where: { id: job.id },
        data: {
          status: newStatus,
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        }
      })
      
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
  
  private generateTags(category: string, title: string): string[] {
    const baseTags = [category.toLowerCase()]
    
    // Extract keywords from title
    const keywords = title.toLowerCase().split(' ').filter(word => word.length > 3)
    baseTags.push(...keywords.slice(0, 3))
    
    // Add platform-specific tags
    const platformTags = {
      'PROPERTY': ['realestate', 'property', 'house', 'apartment'],
      'VEHICLES': ['car', 'vehicle', 'auto', 'motor'],
      'MOBILES_ELECTRONICS': ['electronics', 'gadgets', 'mobile', 'tech'],
      'JOBS': ['job', 'career', 'hiring', 'employment'],
      'SERVICES': ['service', 'business', 'professional', 'local']
    }
    
    if (platformTags[category as keyof typeof platformTags]) {
      baseTags.push(...platformTags[category as keyof typeof platformTags])
    }
    
    return [...new Set(baseTags)].slice(0, 8) // Limit to 8 tags
  }
  
  private async updatePostStats(postId: string, stats: any) {
    await this.prisma.platformPost.update({
      where: { id: postId },
      data: {
        views: stats.views || 0,
        clicks: stats.clicks || 0,
        engagement: (stats.likes || 0) + (stats.comments || 0) + (stats.shares || 0)
      }
    })
  }
}