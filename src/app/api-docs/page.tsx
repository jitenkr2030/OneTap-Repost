'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Copy, 
  CheckCircle, 
  Zap, 
  Shield, 
  Database,
  Globe,
  Key,
  FileText,
  Play,
  Settings
} from 'lucide-react'
import { useState } from 'react'

const apiEndpoints = [
  {
    method: 'POST',
    path: '/auth/signup',
    description: 'Create a new user account',
    request: {
      "email": "user@example.com",
      "password": "password123",
      "name": "John Doe"
    },
    response: {
      "message": "User created successfully",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    description: 'Authenticate user and get access token',
    request: {
      "email": "user@example.com",
      "password": "password123"
    },
    response: {
      "message": "Login successful",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
  },
  {
    method: 'POST',
    path: '/listings',
    description: 'Create a new listing',
    request: {
      "title": "iPhone 13 Pro",
      "description": "Excellent condition iPhone 13 Pro",
      "category": "MOBILES_ELECTRONICS",
      "price": 65000,
      "location": "Mumbai",
      "platforms": ["facebook", "olx"]
    },
    response: {
      "message": "Listing created successfully",
      "listing": {
        "id": "listing_id",
        "title": "iPhone 13 Pro",
        "status": "ACTIVE"
      }
    }
  },
  {
    method: 'GET',
    path: '/listings',
    description: 'Get user listings with pagination',
    request: null,
    response: {
      "listings": [],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 25,
        "pages": 3
      }
    }
  },
  {
    method: 'POST',
    path: '/repost-jobs',
    description: 'Create repost jobs for a listing',
    request: {
      "listingId": "listing_id",
      "platformIds": ["facebook", "instagram"],
      "scheduleType": "now"
    },
    response: {
      "message": "Repost jobs created successfully",
      "jobs": []
    }
  },
  {
    method: 'GET',
    path: '/analytics',
    description: 'Get analytics data for user',
    request: null,
    response: {
      "overview": {
        "totalListings": 10,
        "totalViews": 5000,
        "totalLeads": 25
      },
      "platformPerformance": [],
      "timeSeriesData": []
    }
  }
]

const webhooks = [
  {
    event: 'listing.created',
    description: 'Fired when a new listing is created',
    payload: {
      "event": "listing.created",
      "data": {
        "id": "listing_id",
        "title": "Listing Title",
        "category": "CATEGORY",
        "userId": "user_id",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    }
  },
  {
    event: 'post.published',
    description: 'Fired when a post is successfully published to a platform',
    payload: {
      "event": "post.published",
      "data": {
        "listingId": "listing_id",
        "platformId": "platform_id",
        "postId": "post_id",
        "url": "https://platform.com/post/123",
        "publishedAt": "2024-01-01T00:00:00Z"
      }
    }
  },
  {
    event: 'lead.received',
    description: 'Fired when a new lead is received',
    payload: {
      "event": "lead.received",
      "data": {
        "id": "lead_id",
        "listingId": "listing_id",
        "platformPostId": "platform_post_id",
        "message": "Interested in your listing",
        "contactInfo": "contact@example.com",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    }
  }
]

const sdks = [
  {
    language: 'JavaScript',
    description: 'Node.js and browser JavaScript SDK',
    install: 'npm install onetap-repost-sdk',
    example: `import OneTap from 'onetap-repost-sdk';

const client = new OneTap({
  apiKey: 'your_api_key'
});

// Create a listing
const listing = await client.listings.create({
  title: 'iPhone 13 Pro',
  description: 'Excellent condition',
  category: 'MOBILES_ELECTRONICS',
  price: 65000,
  platforms: ['facebook', 'olx']
});`
  },
  {
    language: 'Python',
    description: 'Python SDK for backend integration',
    install: 'pip install onetap-repost',
    example: `import onetap

client = onetap.Client(api_key='your_api_key')

# Create a listing
listing = client.listings.create(
    title='iPhone 13 Pro',
    description='Excellent condition',
    category='MOBILES_ELECTRONICS',
    price=65000,
    platforms=['facebook', 'olx']
)`
  },
  {
    language: 'cURL',
    description: 'Direct API access using cURL',
    install: 'No installation required',
    example: `curl -X POST https://api.onetaprepost.com/listings \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "iPhone 13 Pro",
    "description": "Excellent condition",
    "category": "MOBILES_ELECTRONICS",
    "price": 65000,
    "platforms": ["facebook", "olx"]
  }'`
  }
]

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error('Failed to copy text: ', error)
    }
  }

  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrate OneTap Repost Engine into your applications with our powerful REST API and SDKs
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Quick Start */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <Key className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold">1. Get API Key</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Sign up and get your API key from the dashboard settings
                </p>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <Code className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">2. Make API Calls</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Use our REST API or SDKs to integrate with your application
                </p>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <Play className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold">3. Start Posting</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Create listings and automatically post to multiple platforms
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold">Authentication</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">API Key Authentication</h3>
                <p className="text-gray-600 mb-4">
                  Include your API key in the Authorization header of all requests:
                </p>
                <div className="bg-gray-100 rounded-lg p-4 relative">
                  <code className="text-sm">
                    Authorization: Bearer your_api_key_here
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard('Authorization: Bearer your_api_key_here', 'auth')}
                  >
                    {copiedCode === 'auth' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1000 requests per hour for authenticated requests</li>
                  <li>• 100 requests per hour for unauthenticated requests</li>
                  <li>• Rate limit headers included in all responses</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">API Endpoints</h2>
            </div>
            
            <Tabs defaultValue="endpoints" className="space-y-6">
              <TabsList>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="sdks">SDKs</TabsTrigger>
              </TabsList>

              <TabsContent value="endpoints" className="space-y-6">
                {apiEndpoints.map((endpoint, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                        </div>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {endpoint.request && (
                        <div>
                          <h4 className="font-medium mb-2">Request Body:</h4>
                          <div className="bg-gray-100 rounded-lg p-4 relative">
                            <pre className="text-sm overflow-x-auto">
                              <code>{formatJSON(endpoint.request)}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(formatJSON(endpoint.request), `request-${index}`)}
                            >
                              {copiedCode === `request-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-medium mb-2">Response:</h4>
                        <div className="bg-gray-100 rounded-lg p-4 relative">
                          <pre className="text-sm overflow-x-auto">
                            <code>{formatJSON(endpoint.response)}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(formatJSON(endpoint.response), `response-${index}`)}
                          >
                            {copiedCode === `response-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="webhooks" className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Webhook Events</h3>
                  <p className="text-gray-600">
                    Subscribe to webhook events to receive real-time notifications about your listings and posts
                  </p>
                </div>

                {webhooks.map((webhook, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{webhook.event}</Badge>
                      </div>
                      <CardDescription>{webhook.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">Payload:</h4>
                      <div className="bg-gray-100 rounded-lg p-4 relative">
                        <pre className="text-sm overflow-x-auto">
                          <code>{formatJSON(webhook.payload)}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(formatJSON(webhook.payload), `webhook-${index}`)}
                        >
                          {copiedCode === `webhook-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sdks" className="space-y-6">
                {sdks.map((sdk, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>{sdk.language} SDK</span>
                      </CardTitle>
                      <CardDescription>{sdk.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Installation:</h4>
                        <div className="bg-gray-100 rounded-lg p-4 relative">
                          <code className="text-sm">{sdk.install}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(sdk.install, `install-${index}`)}
                          >
                            {copiedCode === `install-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Example:</h4>
                        <div className="bg-gray-100 rounded-lg p-4 relative">
                          <pre className="text-sm overflow-x-auto">
                            <code>{sdk.example}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(sdk.example, `example-${index}`)}
                          >
                            {copiedCode === `example-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold">Error Handling</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Error Response Format</h3>
                <div className="bg-gray-100 rounded-lg p-4 relative">
                  <pre className="text-sm overflow-x-auto">
                    <code>{formatJSON({
                      "error": "Error message",
                      "code": "ERROR_CODE",
                      "details": {
                        "field": "Additional error information"
                      }
                    })}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(formatJSON({
                      "error": "Error message",
                      "code": "ERROR_CODE",
                      "details": {
                        "field": "Additional error information"
                      }
                    }), 'error-format')}
                  >
                    {copiedCode === 'error-format' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Common Error Codes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">401</code>
                    <span className="text-sm text-gray-600 ml-2">Unauthorized - Invalid API key</span>
                  </div>
                  <div>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">403</code>
                    <span className="text-sm text-gray-600 ml-2">Forbidden - Insufficient permissions</span>
                  </div>
                  <div>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">404</code>
                    <span className="text-sm text-gray-600 ml-2">Not Found - Resource not found</span>
                  </div>
                  <div>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">429</code>
                    <span className="text-sm text-gray-600 ml-2">Too Many Requests - Rate limit exceeded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get your API key and start integrating OneTap Repost Engine into your applications today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
              <Settings className="mr-2 h-4 w-4" />
              Get API Key
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              <FileText className="mr-2 h-4 w-4" />
              View Full Docs
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}