'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Download,
  Plus,
  Crown,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

interface Subscription {
  id: string
  planId: string
  status: string
  startDate: string
  endDate: string
  quota?: number
  quotaUsed?: number
  config?: any
}

interface Payment {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: string
  transactionId: string
  createdAt: string
  method: string
}

interface Plan {
  id: string
  name: string
  price: number
  duration?: number
  features: string[]
}

const planIcons: { [key: string]: any } = {
  'pay-per-post': Zap,
  'daily': TrendingUp,
  'weekly': Users,
  'enterprise': Crown
}

const planNames: { [key: string]: string } = {
  'pay-per-post': 'Pay Per Repost',
  'daily': 'Daily Auto-Boost',
  'weekly': 'Weekly Pro',
  'enterprise': 'Enterprise'
}

export default function BillingPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/payments')
      if (response.ok) {
        const data = await response.json()
        setSubscriptions(data.subscriptions)
        setPaymentHistory(data.paymentHistory)
        setPlans(data.plans)
      }
    } catch (error) {
      console.error('Billing data fetch error:', error)
      setError('Failed to fetch billing data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planId: string) => {
    setProcessing(true)
    setError('')
    setSuccess('')

    try {
      const plan = plans.find(p => p.id === planId)
      if (!plan) {
        setError('Invalid plan selected')
        return
      }

      // Mock payment processing
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          paymentMethod: 'credit_card',
          amount: plan.price,
          currency: 'INR'
        }),
      })

      if (response.ok) {
        setSuccess(`Successfully upgraded to ${plan.name}!`)
        fetchBillingData()
      } else {
        const data = await response.json()
        setError(data.error || 'Payment failed')
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      setError('An error occurred during payment processing')
    } finally {
      setProcessing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500">Active</Badge>
      case 'EXPIRED':
        return <Badge variant="destructive">Expired</Badge>
      case 'CANCELLED':
        return <Badge variant="secondary">Cancelled</Badge>
      case 'SUSPENDED':
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getPlanIcon = (planId: string) => {
    const IconComponent = planIcons[planId] || Crown
    return <IconComponent className="h-6 w-6" />
  }

  const getQuotaPercentage = (quota?: number, quotaUsed?: number) => {
    if (!quota || quotaUsed === undefined) return 0
    return Math.round((quotaUsed / quota) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading billing information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Upgrade Plan</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Current Subscription */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Subscription</h2>
              {subscriptions.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Active Subscription
                      </h3>
                      <p className="text-gray-500 mb-4">
                        You don't have an active subscription. Choose a plan to get started.
                      </p>
                      <Link href="/pricing">
                        <Button>View Plans</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {subscriptions.map((subscription) => {
                    const isActive = subscription.status === 'ACTIVE'
                    const plan = plans.find(p => p.id === subscription.planId)
                    const IconComponent = planIcons[subscription.planId] || Crown
                    
                    return (
                      <Card key={subscription.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <IconComponent className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">
                                  {planNames[subscription.planId] || subscription.planId}
                                </CardTitle>
                                <CardDescription>
                                  {getStatusBadge(subscription.status)}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                {plan ? formatCurrency(plan.price) : 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {plan?.duration ? `${plan.duration} days` : 'Pay per post'}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Start Date</p>
                              <p className="font-medium">{formatDate(subscription.startDate)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">End Date</p>
                              <p className="font-medium">{formatDate(subscription.endDate)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Transaction ID</p>
                              <p className="font-medium text-sm">{subscription.config?.transactionId || 'N/A'}</p>
                            </div>
                          </div>
                          
                          {subscription.quota && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Usage</span>
                                <span className="text-sm text-gray-500">
                                  {subscription.quotaUsed} / {subscription.quota} posts
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ 
                                    width: `${getQuotaPercentage(subscription.quota, subscription.quotaUsed)}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <CreditCard className="h-4 w-4" />
                              <span>{subscription.config?.paymentMethod || 'Credit Card'}</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpgrade(subscription.planId)}
                              disabled={processing}
                            >
                              {processing ? 'Processing...' : 'Renew'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(paymentHistory.reduce((sum, payment) => sum + payment.amount, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {subscriptions.filter(s => s.status === 'ACTIVE').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Current subscriptions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {subscriptions.length > 0 ? formatDate(subscriptions[0].endDate) : 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Renewal date
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Upgrade Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => {
                  const IconComponent = planIcons[plan.id] || Crown
                  const currentSubscription = subscriptions.find(s => s.planId === plan.id && s.status === 'ACTIVE')
                  
                  return (
                    <Card key={plan.id} className={`relative ${currentSubscription ? 'border-green-500 bg-green-50' : 'hover:shadow-lg transition-shadow'}`}>
                      {currentSubscription && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-green-500 text-white px-3 py-1">
                            Current Plan
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {formatCurrency(plan.price)}
                        </div>
                        <CardDescription>
                          {plan.duration ? `${plan.duration} days` : 'Pay per post'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature.replace('_', ' ')}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full ${currentSubscription ? 'bg-green-600 hover:bg-green-700' : ''}`}
                          variant={currentSubscription ? 'default' : 'outline'}
                          onClick={() => handleUpgrade(plan.id)}
                          disabled={processing || !!currentSubscription}
                        >
                          {processing ? 'Processing...' : currentSubscription ? 'Current Plan' : 'Upgrade Now'}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Payment History</h2>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              {paymentHistory.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Payment History
                      </h3>
                      <p className="text-gray-500">
                        You haven't made any payments yet.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <CreditCard className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {planNames[payment.subscriptionId.split('_')[0]] || 'Subscription Payment'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {payment.method} • {payment.transactionId}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{formatCurrency(payment.amount)}</div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(payment.status)}
                              <span className="text-sm text-gray-500">
                                {formatDate(payment.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}