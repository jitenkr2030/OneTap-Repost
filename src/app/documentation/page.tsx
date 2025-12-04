'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  BookOpen, 
  Code, 
  Play, 
  Download, 
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Shield,
  Database,
  Globe,
  Key,
  FileText,
  Settings,
  Copy
} from 'lucide-react'
import { useState } from 'react'

const docSections = [
  {
    title: "Getting Started",
    description: "Quick start guide and basic concepts",
    icon: Zap,
    articles: [
      { title: "Introduction to OneTap Repost Engine", readTime: "5 min" },
      { title: "Creating Your Account", readTime: "3 min" },
      { title: "Understanding the Dashboard", readTime: "7 min" },
      { title: "Your First Listing", readTime: "10 min" }
    ]
  },
  {
    title: "Core Features",
    description: "Learn about our main features and capabilities",
    icon: Settings,
    articles: [
      { title: "Creating Listings", readTime: "8 min" },
      { title: "Platform Integration", readTime: "12 min" },
      { title: "Scheduled Posting", readTime: "6 min" },
      { title: "Analytics & Reporting", readTime: "9 min" }
    ]
  },
  {
    title: "Platform Guides",
    description: "Platform-specific setup and optimization guides",
    icon: Globe,
    articles: [
      { title: "Facebook Marketplace Setup", readTime: "8 min" },
      { title: "Instagram Integration", readTime: "7 min" },
      { title: "WhatsApp Business API", readTime: "10 min" },
      { title: "Telegram Channel Posting", readTime: "6 min" },
      { title: "OLX Integration", readTime: "9 min" },
      { title: "LinkedIn Company Pages", readTime: "8 min" }
    ]
  },
  {
    title: "API Reference",
    description: "Complete API documentation and examples",
    icon: Code,
    articles: [
      { title: "Authentication", readTime: "5 min" },
      { title: "Listings API", readTime: "12 min" },
      { title: "Analytics API", readTime: "8 min" },
      { title: "Webhooks", readTime: "6 min" },
      { title: "Error Handling", readTime: "7 min" },
      { title: "Rate Limits", readTime: "4 min" }
    ]
  },
  {
    title: "Advanced Topics",
    description: "Advanced features and customization options",
    icon: Database,
    articles: [
      { title: "Custom Workflows", readTime: "15 min" },
      { title: "Webhook Integration", readTime: "10 min" },
      { title: "API Keys Management", readTime: "6 min" },
      { title: "Team Collaboration", readTime: "8 min" }
    ]
  },
  {
    title: "Security",
    description: "Security best practices and guidelines",
    icon: Shield,
    articles: [
      { title: "Account Security", readTime: "6 min" },
      { title: "API Security", readTime: "8 min" },
      { title: "Data Privacy", readTime: "7 min" },
      { title: "Compliance", readTime: "9 min" }
    ]
  }
]

const quickStarts = [
  {
    title: "5-Minute Quick Start",
    description: "Get up and running in just 5 minutes",
    steps: [
      "Sign up for an account",
      "Connect your first platform",
      "Create your first listing",
      "Schedule your first post",
      "Track your results"
    ]
  },
  {
    title: "Platform Integration",
    description: "Connect your social media accounts",
    steps: [
      "Navigate to Accounts page",
      "Click 'Connect Account'",
      "Choose your platform",
      "Follow OAuth flow",
      "Verify connection"
    ]
  },
  {
    title: "First Listing",
    description: "Create and publish your first listing",
    steps: [
      "Click 'Create Listing'",
      "Fill in listing details",
      "Upload images/videos",
      "Select target platforms",
      "Publish or schedule"
    ]
  }
]

const codeExamples = [
  {
    language: "JavaScript",
    title: "Create a Listing",
    code: `const response = await fetch('/api/listings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    title: 'iPhone 13 Pro',
    description: 'Excellent condition iPhone 13 Pro',
    category: 'MOBILES_ELECTRONICS',
    price: 65000,
    location: 'Mumbai',
    platforms: ['facebook', 'olx']
  })
});

const listing = await response.json();`
  },
  {
    language: "Python",
    title: "Get Analytics",
    code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.get('https://api.onetaprepost.com/analytics', headers=headers)
analytics = response.json()

print(f"Total views: {analytics['overview']['totalViews']}")
print(f"Total leads: {analytics['overview']['totalLeads']}")`
  },
  {
    language: "cURL",
    title: "Connect Platform",
    code: `curl -X POST https://api.onetaprepost.com/accounts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platformId": "facebook",
    "authCode": "AUTH_CODE_FROM_OAUTH"
  }'`
  }
]

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSection, setSelectedSection] = useState("all")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides, API references, and examples to help you succeed with OneTap Repost Engine
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Search Bar */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documentation..."
                className="pl-12 pr-4 py-3 text-lg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quick Start Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started quickly with our step-by-step guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStarts.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-xs font-semibold text-blue-600">{stepIndex + 1}</span>
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    View Full Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Documentation Sections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive documentation by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <section.icon className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{article.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Code Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practical examples to help you integrate with our API
            </p>
          </div>

          <Tabs defaultValue="javascript" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>

            {codeExamples.map((example, index) => (
              <TabsContent key={index} value={example.language.toLowerCase()}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      {example.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View API Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Additional Resources */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More resources to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Play className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">
                Step-by-step video guides
              </p>
              <Button variant="outline" size="sm">Watch Videos</Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Download className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">SDKs</h3>
              <p className="text-sm text-gray-600 mb-4">
                Official SDKs and libraries
              </p>
              <Button variant="outline" size="sm">Download SDKs</Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600 mb-4">
                Join our developer community
              </p>
              <Button variant="outline" size="sm">Join Community</Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Key className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">API Keys</h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage your API keys
              </p>
              <Button variant="outline" size="sm">Manage Keys</Button>
            </Card>
          </div>
        </section>

        {/* Status Page */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                System Status
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                All systems are operational and running smoothly
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold">API</h3>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold">Dashboard</h3>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold">Platform Integrations</h3>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Button variant="outline">
                View Detailed Status
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need More Help?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Our support team is here to help you succeed with OneTap Repost Engine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              Join Community
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}