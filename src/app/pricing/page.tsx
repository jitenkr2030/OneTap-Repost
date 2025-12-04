'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Star, Zap, Users, TrendingUp, Crown } from 'lucide-react'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Pay Per Repost',
    price: '₹10-₹99',
    description: 'Per platform per post',
    icon: Zap,
    popular: false,
    features: [
      'No monthly commitment',
      'Pay only for what you use',
      'Full platform access',
      'Basic analytics',
      'Email support',
      'Up to 5 platforms'
    ],
    cta: 'Get Started',
    highlight: 'Perfect for occasional posters'
  },
  {
    name: 'Daily Auto-Boost',
    price: '₹199-₹399',
    description: 'Per day',
    icon: TrendingUp,
    popular: true,
    features: [
      'Unlimited daily reposts',
      'Priority processing',
      'Advanced analytics',
      'Email support',
      'Up to 10 platforms',
      'Auto-optimization',
      'Lead management'
    ],
    cta: 'Start Free Trial',
    highlight: 'Most popular for active sellers'
  },
  {
    name: 'Weekly Pro',
    price: '₹499-₹999',
    description: 'Per week',
    icon: Users,
    popular: false,
    features: [
      'All Daily features',
      'Multi-account support',
      'Lead aggregation',
      'Priority support',
      'Up to 20 platforms',
      'Custom workflows',
      'API access',
      'Advanced reporting'
    ],
    cta: 'Start Free Trial',
    highlight: 'Best for growing businesses'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Unlimited everything',
    icon: Crown,
    popular: false,
    features: [
      'All Pro features',
      'Unlimited platforms',
      'Unlimited accounts',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'SLA guarantee',
      'Advanced security',
      'Custom training',
      'Priority development'
    ],
    cta: 'Contact Sales',
    highlight: 'For large organizations'
  }
]

const features = [
  {
    title: 'Platform Coverage',
    description: 'Access to 50+ social media, marketplace, and messaging platforms'
  },
  {
    title: 'Smart Scheduling',
    description: 'AI-powered optimal posting times and automatic scheduling'
  },
  {
    title: 'Content Optimization',
    description: 'Automatic content adaptation for each platform\'s best practices'
  },
  {
    title: 'Analytics & Reporting',
    description: 'Detailed performance insights and ROI tracking'
  },
  {
    title: 'Lead Management',
    description: 'Centralized inbox and lead qualification tools'
  },
  {
    title: 'Multi-Account Support',
    description: 'Connect and manage multiple accounts per platform'
  },
  {
    title: 'Media Processing',
    description: 'Automatic image optimization and thumbnail generation'
  },
  {
    title: 'Priority Support',
    description: '24/7 customer support with dedicated account managers'
  }
]

const comparisonData = [
  {
    feature: 'Monthly Posts',
    payPerPost: 'Pay per post',
    daily: 'Unlimited',
    weekly: 'Unlimited',
    enterprise: 'Unlimited'
  },
  {
    feature: 'Platforms',
    payPerPost: '5',
    daily: '10',
    weekly: '20',
    enterprise: '50+'
  },
  {
    feature: 'Accounts per Platform',
    payPerPost: '1',
    daily: '3',
    weekly: '10',
    enterprise: 'Unlimited'
  },
  {
    feature: 'Analytics',
    payPerPost: 'Basic',
    daily: 'Advanced',
    weekly: 'Advanced',
    enterprise: 'Enterprise'
  },
  {
    feature: 'Lead Management',
    payPerPost: '❌',
    daily: '✅',
    weekly: '✅',
    enterprise: '✅'
  },
  {
    feature: 'API Access',
    payPerPost: '❌',
    daily: '❌',
    weekly: '✅',
    enterprise: '✅'
  },
  {
    feature: 'Priority Support',
    payPerPost: 'Email',
    daily: 'Email',
    weekly: 'Priority',
    enterprise: '24/7 Dedicated'
  },
  {
    feature: 'Custom Integrations',
    payPerPost: '❌',
    daily: '❌',
    weekly: '❌',
    enterprise: '✅'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business. All plans include a 7-day free trial.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Pricing Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : 'hover:shadow-lg transition-shadow'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <plan.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                  {plan.highlight && (
                    <Badge variant="secondary" className="mt-2">
                      {plan.highlight}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.cta === 'Contact Sales' ? '/contact' : '/signup'}>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features included in every plan to help you grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect plan for your business needs
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Pay Per Repost</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 bg-blue-50">Daily Auto-Boost</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Weekly Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">{row.payPerPost}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500 bg-blue-50">{row.daily}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">{row.weekly}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What platforms are included?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All plans include access to 50+ platforms including Facebook, Instagram, WhatsApp, Telegram, OLX, LinkedIn, and many more. Enterprise plans can request custom platform integrations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a contract?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No, we don't believe in long-term contracts. You can cancel your subscription at any time, and you'll continue to have access until the end of your current billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. Enterprise customers can also pay via invoice.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Start your 7-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Contact Sales
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}