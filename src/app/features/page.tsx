'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Zap, 
  Globe, 
  Users, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Target, 
  Clock,
  Upload,
  BarChart3,
  MessageSquare,
  Settings,
  RefreshCw,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Zap,
    title: 'One-Click Multi-Platform Reposting',
    description: 'Upload once and automatically post to all selected platforms with optimized content for each.',
    benefits: [
      'Save hours of manual posting',
      'Consistent branding across platforms',
      'Optimized content for each platform'
    ]
  },
  {
    icon: Globe,
    title: 'Universal Platform Support',
    description: 'Connect to Facebook, Instagram, WhatsApp, Telegram, OLX, and 50+ other platforms.',
    benefits: [
      'All major social media platforms',
      'Leading marketplace sites',
      'Messaging apps and forums'
    ]
  },
  {
    icon: Users,
    title: 'Multi-Account Management',
    description: 'Connect and manage multiple accounts across different platforms from a single dashboard.',
    benefits: [
      'Unlimited account connections',
      'Easy account switching',
      'Centralized management'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Smart AI Optimization',
    description: 'AI-powered content optimization, hashtag suggestions, and best posting time recommendations.',
    benefits: [
      'Intelligent content rewriting',
      'Optimal posting times',
      'Performance predictions'
    ]
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with encrypted tokens and secure authentication for all platforms.',
    benefits: [
      'Bank-level encryption',
      'OAuth 2.0 authentication',
      'Regular security audits'
    ]
  },
  {
    icon: Smartphone,
    title: 'Mobile-Friendly',
    description: 'Full mobile support with responsive design and dedicated mobile apps coming soon.',
    benefits: [
      'Responsive web design',
      'Mobile apps in development',
      'On-the-go management'
    ]
  },
  {
    icon: Target,
    title: 'Centralized Dashboard',
    description: 'Track all your listings, leads, and performance metrics in one unified dashboard.',
    benefits: [
      'Real-time analytics',
      'Lead management',
      'Performance tracking'
    ]
  },
  {
    icon: Clock,
    title: 'Scheduled & Recurring Posting',
    description: 'Set up automatic reposting schedules to keep your listings fresh and visible.',
    benefits: [
      'Flexible scheduling options',
      'Recurring posts',
      'Automatic renewal'
    ]
  }
]

const categories = [
  {
    name: 'Property',
    description: 'Real estate listings for apartments, houses, and commercial properties',
    platforms: ['99Acres', 'MagicBricks', 'Facebook Marketplace', 'Telegram', 'WhatsApp'],
    icon: '🏠'
  },
  {
    name: 'Vehicles',
    description: 'Cars, bikes, and other vehicles for sale',
    platforms: ['OLX Vehicles', 'CarDekho', 'Facebook Marketplace', 'Telegram Auto Groups'],
    icon: '🚗'
  },
  {
    name: 'Mobiles & Electronics',
    description: 'Smartphones, laptops, and electronic gadgets',
    platforms: ['OLX', 'Facebook Marketplace', 'Instagram', 'Telegram Buy/Sell'],
    icon: '📱'
  },
  {
    name: 'Jobs',
    description: 'Job postings and career opportunities',
    platforms: ['LinkedIn', 'Facebook Job Groups', 'Telegram Job Channels', 'WhatsApp Job Groups'],
    icon: '💼'
  },
  {
    name: 'Services',
    description: 'Professional services and local businesses',
    platforms: ['JustDial', 'Sulekha', 'Facebook Service Groups', 'WhatsApp Groups'],
    icon: '🔧'
  },
  {
    name: 'Rentals',
    description: 'Property rentals and accommodation',
    platforms: ['NoBroker', 'Facebook Marketplace', 'Telegram Rooms Groups', 'WhatsApp Rental Circles'],
    icon: '🏘️'
  },
  {
    name: 'Education',
    description: 'Courses, tutoring, and educational services',
    platforms: ['UrbanPro', 'Facebook Tutoring Groups', 'Telegram Education Channels'],
    icon: '📚'
  },
  {
    name: 'Pets',
    description: 'Pets, pet supplies, and related services',
    platforms: ['Facebook Pet Groups', 'Telegram Adoption Channels', 'OLX Pets'],
    icon: '🐕'
  },
  {
    name: 'General Sales',
    description: 'General merchandise and miscellaneous items',
    platforms: ['OLX', 'Facebook Marketplace', 'Instagram', 'WhatsApp Business Catalog'],
    icon: '🛍️'
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Maximum Reach
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Everything you need to automate your posting workflow and grow your business across multiple platforms
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Core Features */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed to save you time and maximize your reach across all platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Support */}
        <section className="mb-20">
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
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{category.description}</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Target Platforms:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.platforms.map((platform, platformIndex) => (
                        <Badge key={platformIndex} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take your posting to the next level with our advanced automation tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Upload className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Smart Media Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically optimize images, remove backgrounds, and generate engaging thumbnails for better visibility.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deep insights into your performance with detailed analytics, A/B testing, and ROI tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Lead Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Centralized inbox for all your leads with automated responses and lead scoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Custom Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create custom posting workflows with conditional logic and multi-step sequences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <RefreshCw className="w-12 h-12 text-red-600 mb-4" />
                <CardTitle>Auto-Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically optimize your posts based on performance data and platform algorithms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-indigo-600 mb-4" />
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced security features including SSO, role-based access, and compliance tools.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Posting Strategy?
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
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                View Pricing
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}