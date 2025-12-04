'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, Zap, Globe, Users, TrendingUp, Shield, Smartphone, Target, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const categories = [
    { name: 'Property', platforms: ['99Acres', 'MagicBricks', 'FB Marketplace', 'Telegram'] },
    { name: 'Vehicles', platforms: ['OLX Vehicles', 'CarDekho', 'FB Marketplace', 'Telegram'] },
    { name: 'Mobiles & Electronics', platforms: ['OLX', 'FB Marketplace', 'Instagram', 'Telegram'] },
    { name: 'Jobs', platforms: ['LinkedIn', 'FB Job Groups', 'Telegram', 'WhatsApp'] },
    { name: 'Services', platforms: ['JustDial', 'Sulekha', 'FB Groups', 'WhatsApp'] },
    { name: 'Rentals', platforms: ['NoBroker', 'FB Marketplace', 'Telegram', 'WhatsApp'] },
    { name: 'Education', platforms: ['UrbanPro', 'FB Tutoring', 'Telegram Channels'] },
    { name: 'Pets', platforms: ['FB Pet Groups', 'Telegram', 'OLX Pets'] },
    { name: 'General Sales', platforms: ['OLX', 'FB Marketplace', 'Instagram', 'WhatsApp'] },
  ]

  const features = [
    {
      icon: Zap,
      title: 'One-Click Multi-Platform Reposting',
      description: 'Upload once and automatically post to all selected platforms with optimized content for each.'
    },
    {
      icon: Globe,
      title: 'Universal Platform Support',
      description: 'Connect to Facebook, Instagram, WhatsApp, Telegram, OLX, and 50+ other platforms.'
    },
    {
      icon: Users,
      title: 'Multi-Account Management',
      description: 'Connect and manage multiple accounts across different platforms from a single dashboard.'
    },
    {
      icon: TrendingUp,
      title: 'Smart AI Optimization',
      description: 'AI-powered content optimization, hashtag suggestions, and best posting time recommendations.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted tokens and secure authentication for all platforms.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly',
      description: 'Full mobile support with responsive design and dedicated mobile apps coming soon.'
    },
    {
      icon: Target,
      title: 'Centralized Dashboard',
      description: 'Track all your listings, leads, and performance metrics in one unified dashboard.'
    },
    {
      icon: Clock,
      title: 'Scheduled & Recurring Posting',
      description: 'Set up automatic reposting schedules to keep your listings fresh and visible.'
    }
  ]

  const pricingPlans = [
    {
      name: 'Pay Per Repost',
      price: '₹10-₹99',
      description: 'Per platform per post',
      features: ['No monthly commitment', 'Pay only for what you use', 'Full platform access', 'Basic analytics']
    },
    {
      name: 'Daily Auto-Boost',
      price: '₹199-₹399',
      description: 'Per day',
      features: ['Unlimited daily reposts', 'Priority processing', 'Advanced analytics', 'Email support']
    },
    {
      name: 'Weekly Pro',
      price: '₹499-₹999',
      description: 'Per week',
      features: ['All Daily features', 'Multi-account support', 'Lead aggregation', 'Priority support']
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Unlimited everything',
      features: ['All Pro features', 'API access', 'Custom integrations', 'Dedicated account manager']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              🚀 BETA LAUNCH
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              OneTap Repost Engine
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Universal Auto-Repost Platform — Upload once, choose category, auto-post everywhere
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
              Stop wasting time reposting manually. Let our AI-powered engine automatically distribute your listings across 50+ platforms with optimized content for maximum reach and engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Maximum Reach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate your posting workflow and grow your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Support for All Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whatever you're selling, we've got you covered with automatic platform mapping
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.platforms.map((platform, platformIndex) => (
                      <Badge key={platformIndex} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Listing</h3>
              <p className="text-gray-600">Add your product details, images, and select a category</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Platforms</h3>
              <p className="text-gray-600">Select which platforms to post on or let AI choose for you</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Repost & Track</h3>
              <p className="text-gray-600">Watch your listing go live everywhere and track performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full" variant={index === 3 ? "default" : "outline"}>
                      {index === 3 ? "Contact Sales" : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Supercharge Your Posting?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of businesses who are already saving hours every week with OneTap Repost Engine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OneTap Repost Engine</h3>
              <p className="text-gray-400">
                Universal auto-repost platform for maximum reach and engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OneTap Repost Engine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}