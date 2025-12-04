'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Send, 
  Linkedin, 
  ShoppingBag, 
  Github,
  Zap,
  CheckCircle,
  ExternalLink,
  Plus,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface Platform {
  name: string
  description: string
  category: string
  icon: any
  features: string[]
  status: 'available' | 'beta' | 'coming-soon'
  docsUrl?: string
  setupComplexity: 'easy' | 'medium' | 'advanced'
}

const platforms: Platform[] = [
  {
    name: 'Facebook Marketplace',
    description: 'Reach millions of buyers on Facebook\'s marketplace platform',
    category: 'Social Media',
    icon: Facebook,
    features: [
      'Automatic posting',
      'Category mapping',
      'Image optimization',
      'Lead collection',
      'Performance tracking'
    ],
    status: 'available',
    docsUrl: '#',
    setupComplexity: 'easy'
  },
  {
    name: 'Instagram',
    description: 'Share your listings visually on Instagram with optimized content',
    category: 'Social Media',
    icon: Instagram,
    features: [
      'Image and video posting',
      'Hashtag optimization',
      'Story integration',
      'Engagement tracking',
      'Auto-respond to comments'
    ],
    status: 'available',
    docsUrl: '#',
    setupComplexity: 'medium'
  },
  {
    name: 'WhatsApp Business',
    description: 'Share listings directly with customers via WhatsApp',
    category: 'Messaging',
    icon: MessageCircle,
    features: [
      'Business API integration',
      'Catalog sharing',
      'Quick replies',
      'Message templates',
      'Customer segmentation'
    ],
    status: 'available',
    docsUrl: '#',
    setupComplexity: 'medium'
  },
  {
    name: 'Telegram',
    description: 'Post to channels and groups with automated formatting',
    category: 'Messaging',
    icon: Send,
    features: [
      'Channel posting',
      'Group management',
      'Auto-formatting',
      'Scheduling',
      'Analytics tracking'
    ],
    status: 'available',
    docsUrl: '#',
    setupComplexity: 'easy'
  },
  {
    name: 'LinkedIn',
    description: 'Share professional services and B2B offerings',
    category: 'Professional',
    icon: Linkedin,
    features: [
      'Company page posting',
      'Article sharing',
      'Professional networking',
      'Lead generation',
      'Analytics insights'
    ],
    status: 'beta',
    docsUrl: '#',
    setupComplexity: 'medium'
  },
  {
    name: 'OLX',
    description: 'India\'s largest online marketplace for classifieds',
    category: 'Marketplace',
    icon: ShoppingBag,
    features: [
      'Category optimization',
      'Location targeting',
      'Price suggestions',
      'Image enhancement',
      'Lead management'
    ],
    status: 'available',
    docsUrl: '#',
    setupComplexity: 'easy'
  }
]

const categories = [
  { name: 'Social Media', count: 2, color: 'bg-blue-100 text-blue-800' },
  { name: 'Messaging', count: 2, color: 'bg-green-100 text-green-800' },
  { name: 'Marketplace', count: 1, color: 'bg-purple-100 text-purple-800' },
  { name: 'Professional', count: 1, color: 'bg-orange-100 text-orange-800' }
]

const comingSoon = [
  { name: 'Twitter', category: 'Social Media', icon: '🐦' },
  { name: 'Pinterest', category: 'Social Media', icon: '📌' },
  { name: 'YouTube', category: 'Social Media', icon: '📺' },
  { name: 'TikTok', category: 'Social Media', icon: '🎵' },
  { name: 'Snapchat', category: 'Social Media', icon: '👻' },
  { name: 'Reddit', category: 'Social Media', icon: '🎯' },
  { name: 'Quora', category: 'Social Media', icon: '❓' },
  { name: 'JustDial', category: 'Directory', icon: '📞' },
  { name: 'Sulekha', category: 'Directory', icon: '📝' },
  { name: '99Acres', category: 'Real Estate', icon: '🏢' },
  { name: 'MagicBricks', category: 'Real Estate', icon: '🏠' },
  { name: 'NoBroker', category: 'Real Estate', icon: '🔑' },
  { name: 'CarDekho', category: 'Automotive', icon: '🚗' },
  { name: 'BikeDekho', category: 'Automotive', icon: '🏍️' },
  { name: 'UrbanPro', category: 'Education', icon: '📚' },
  { name: 'MyPrivateTutor', category: 'Education', icon: '👨‍🏫' }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <Badge className="bg-green-500">Available</Badge>
    case 'beta':
      return <Badge className="bg-yellow-500">Beta</Badge>
    case 'coming-soon':
      return <Badge className="bg-gray-500">Coming Soon</Badge>
    default:
      return <Badge>Unknown</Badge>
  }
}

const getComplexityBadge = (complexity: string) => {
  switch (complexity) {
    case 'easy':
      return <Badge variant="secondary">Easy Setup</Badge>
    case 'medium':
      return <Badge variant="outline">Medium Setup</Badge>
    case 'advanced':
      return <Badge variant="destructive">Advanced Setup</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Platform Integrations
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with 50+ platforms to maximize your reach. OneTap Repost Engine integrates with all major social media, marketplace, and messaging platforms.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Start Integrating
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Stats Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Platforms Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">API</div>
              <div className="text-gray-600">First Access</div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Integration Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We support all major platform types to ensure your listings reach the right audience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color}`}>
                    <span className="text-2xl font-bold">{category.count}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">Platforms available</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Integrations */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect your accounts and start posting across multiple platforms instantly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <platform.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <CardDescription>{platform.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(platform.status)}
                      {getComplexityBadge(platform.setupComplexity)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{platform.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {platform.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    {platform.docsUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={platform.docsUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Docs
                        </a>
                      </Button>
                    )}
                    <Link href="/accounts">
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We\'re constantly adding new platforms. Here\'s what\'s coming next:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {comingSoon.map((platform, index) => (
              <Card key={index} className="text-center opacity-75">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{platform.icon}</div>
                  <h3 className="font-medium text-sm mb-1">{platform.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {platform.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* API Integration */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-12">
            <div className="max-w-4xl mx-auto text-center">
              <Github className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                API Integration
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Want to build custom integrations? Our powerful API lets you connect with any platform or build custom workflows.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-2">RESTful API</h3>
                  <p className="text-sm text-gray-600">
                    Easy-to-use REST endpoints for all platform operations
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Webhooks</h3>
                  <p className="text-sm text-gray-600">
                    Real-time notifications for post updates and leads
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">SDKs</h3>
                  <p className="text-sm text-gray-600">
                    Official SDKs for popular programming languages
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/api">
                  <Button size="lg">
                    <Zap className="mr-2 h-4 w-4" />
                    View API Docs
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Get API Key
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Connect Your Platforms?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Start your 7-day free trial and connect with 50+ platforms instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Request Integration
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}