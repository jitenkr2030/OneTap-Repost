import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { SubscriptionStatus } from '@prisma/client'

// Mock payment gateway integration
const mockPaymentGateway = {
  processPayment: async (amount: number, currency: string = 'INR') => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock success (95% success rate)
    if (Math.random() > 0.05) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        currency,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    } else {
      throw new Error('Payment failed: Insufficient funds')
    }
  }
}

const planConfigs = {
  'pay-per-post': {
    name: 'Pay Per Repost',
    price: 10, // Base price per post
    features: ['platform_access', 'basic_analytics', 'email_support']
  },
  'daily': {
    name: 'Daily Auto-Boost',
    price: 199,
    duration: 1, // days
    features: ['unlimited_posts', 'priority_processing', 'advanced_analytics', 'lead_management']
  },
  'weekly': {
    name: 'Weekly Pro',
    price: 499,
    duration: 7, // days
    features: ['daily_features', 'multi_account', 'api_access', 'priority_support']
  },
  'enterprise': {
    name: 'Enterprise',
    price: 9999,
    duration: 30, // days
    features: ['weekly_features', 'unlimited_everything', 'dedicated_support', 'custom_integrations']
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

    const { planId, paymentMethod, amount, currency = 'INR' } = await request.json()

    if (!planId || !paymentMethod || !amount) {
      return NextResponse.json(
        { error: 'Plan ID, payment method, and amount are required' },
        { status: 400 }
      )
    }

    // Validate plan
    const planConfig = planConfigs[planId as keyof typeof planConfigs]
    if (!planConfig) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      )
    }

    // Process payment
    const paymentResult = await mockPaymentGateway.processPayment(amount, currency)

    // Calculate subscription dates
    const startDate = new Date()
    const endDate = new Date()
    
    if (planConfig.duration) {
      endDate.setDate(endDate.getDate() + planConfig.duration)
    } else {
      // For pay-per-post, set 1 year validity
      endDate.setFullYear(endDate.getFullYear() + 1)
    }

    // Create or update subscription
    const subscription = await db.subscription.create({
      data: {
        userId: userId,
        planId: planId,
        status: SubscriptionStatus.ACTIVE,
        startDate: startDate,
        endDate: endDate,
        lastBillingAt: startDate,
        nextBillingAt: endDate,
        quota: planId === 'pay-per-post' ? amount / planConfig.price : null,
        quotaUsed: 0,
        config: {
          paymentMethod,
          transactionId: paymentResult.transactionId,
          amount,
          currency,
          features: planConfig.features
        }
      }
    })

    return NextResponse.json({
      message: 'Payment successful',
      subscription: {
        id: subscription.id,
        planId: subscription.planId,
        status: subscription.status,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        quota: subscription.quota,
        quotaUsed: subscription.quotaUsed,
        transactionId: paymentResult.transactionId
      },
      payment: paymentResult
    })

  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment processing failed' },
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

    // Get user's subscriptions
    const subscriptions = await db.subscription.findMany({
      where: {
        userId: userId
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get payment history (mock data for now)
    const paymentHistory = subscriptions.map(sub => ({
      id: `payment_${sub.id}`,
      subscriptionId: sub.id,
      amount: sub.config?.amount || 0,
      currency: sub.config?.currency || 'INR',
      status: sub.status,
      transactionId: sub.config?.transactionId,
      createdAt: sub.createdAt,
      method: sub.config?.paymentMethod || 'Unknown'
    }))

    return NextResponse.json({
      subscriptions,
      paymentHistory,
      plans: Object.keys(planConfigs).map(key => ({
        id: key,
        ...planConfigs[key as keyof typeof planConfigs]
      }))
    })

  } catch (error) {
    console.error('Payment fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}