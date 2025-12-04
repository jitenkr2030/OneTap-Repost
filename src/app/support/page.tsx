'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Phone, 
  Mail,
  Users,
  Zap,
  Settings,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Star
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const helpCategories = [
  { name: "Getting Started", icon: Zap, count: 12 },
  { name: "Account Management", icon: Users, count: 8 },
  { name: "Creating Listings", icon: Settings, count: 15 },
  { name: "Platform Integration", icon: TrendingUp, count: 20 },
  { name: "Analytics & Reports", icon: BookOpen, count: 10 },
  { name: "Billing & Payments", icon: Star, count: 6 }
]

const helpArticles = [
  {
    id: 1,
    title: "How to Create Your First Listing",
    category: "Getting Started",
    description: "Step-by-step guide to creating and publishing your first listing across multiple platforms.",
    readTime: "5 min read",
    difficulty: "Beginner",
    featured: true
  },
  {
    id: 2,
    title: "Connecting Your Social Media Accounts",
    category: "Platform Integration",
    description: "Learn how to connect and manage your social media and marketplace accounts.",
    readTime: "8 min read",
    difficulty: "Beginner",
    featured: false
  },
  {
    id: 3,
    title: "Understanding Your Analytics Dashboard",
    category: "Analytics & Reports",
    description: "Comprehensive guide to understanding and using your analytics data effectively.",
    readTime: "10 min read",
    difficulty: "Intermediate",
    featured: true
  },
  {
    id: 4,
    title: "Setting Up Scheduled Posting",
    category: "Creating Listings",
    description: "How to schedule your listings for automatic posting at optimal times.",
    readTime: "7 min read",
    difficulty: "Intermediate",
    featured: false
  },
  {
    id: 5,
    title: "Managing Your Subscription",
    category: "Billing & Payments",
    description: "Everything you need to know about subscription plans, billing, and payments.",
    readTime: "6 min read",
    difficulty: "Beginner",
    featured: false
  },
  {
    id: 6,
    title: "Troubleshooting Common Issues",
    category: "Account Management",
    description: "Solutions to common problems users face while using the platform.",
    readTime: "8 min read",
    difficulty: "Intermediate",
    featured: false
  }
]

const videoTutorials = [
  {
    id: 1,
    title: "Platform Overview Tour",
    duration: "3:45",
    description: "Quick tour of the OneTap Repost Engine platform and its main features.",
    thumbnail: "🎥"
  },
  {
    id: 2,
    title: "Creating a Listing Step-by-Step",
    duration: "5:20",
    description: "Detailed video guide on creating and optimizing your listings.",
    thumbnail: "📹"
  },
  {
    id: 3,
    title: "Connecting Multiple Platforms",
    duration: "4:15",
    description: "Learn how to connect and manage multiple platform accounts.",
    thumbnail: "📺"
  },
  {
    id: 4,
    title: "Understanding Your Analytics",
    duration: "6:30",
    description: "Deep dive into analytics and how to use data to improve your results.",
    thumbnail: "📸"
  }
]

const faqs = [
  {
    question: "How do I get started with OneTap Repost Engine?",
    answer: "Getting started is easy! Simply sign up for an account, connect your social media and marketplace accounts, and start creating listings. We offer a 7-day free trial with 50 free reposts to help you get started."
  },
  {
    question: "What platforms do you support?",
    answer: "We support 50+ platforms including Facebook, Instagram, WhatsApp, Telegram, OLX, LinkedIn, and many more. We're constantly adding new platforms based on customer demand."
  },
  {
    question: "How does the pricing work?",
    answer: "We offer flexible pricing plans including pay-per-post, daily, weekly, and monthly subscriptions. You can choose the plan that best fits your needs and upgrade or downgrade at any time."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security very seriously. We use bank-level encryption to protect your data and platform credentials. We're also GDPR compliant and follow industry best practices for data security."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period with no long-term commitments."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we offer 24/7 customer support through email and chat. Our enterprise customers also have access to dedicated account managers and priority support."
  }
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of OneTap Repost Engine
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
                placeholder="Search for help articles, videos, and more..."
                className="pl-12 pr-4 py-3 text-lg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Quick Help Options */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Knowledge Base</h3>
              <p className="text-sm text-gray-600 mb-4">Comprehensive guides and documentation</p>
              <Badge variant="secondary">{helpArticles.length} Articles</Badge>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Video className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">Step-by-step video guides</p>
              <Badge variant="secondary">{videoTutorials.length} Videos</Badge>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
              <Badge variant="secondary">Available 24/7</Badge>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Phone className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">Call us for immediate help</p>
              <Badge variant="secondary">Mon-Fri 9AM-6PM</Badge>
            </Card>
          </div>
        </section>

        {/* Help Content Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "All" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("All")}
                >
                  All Categories
                </Button>
                {helpCategories.map(category => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon && <category.icon className="w-4 h-4 mr-2" />}
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{article.category}</Badge>
                        {article.featured && <Badge variant="default">Featured</Badge>}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <Badge variant="secondary">{article.difficulty}</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or category filter
                  </p>
                  <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoTutorials.map(video => (
                  <Card key={video.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-6xl">{video.thumbnail}</span>
                      </div>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{video.duration}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Watch Video
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Live Chat
                          </CardTitle>
                          <CardDescription>
                            Chat with our support team in real-time
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Available 24/7 for immediate assistance
                          </p>
                          <Button className="w-full">Start Chat</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Mail className="w-5 h-5 mr-2" />
                            Email Support
                          </CardTitle>
                          <CardDescription>
                            Send us a detailed message
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            We'll respond within 24 hours
                          </p>
                          <Button variant="outline" className="w-full">
                            Send Email
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6">Support Hours</h2>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Phone className="w-5 h-5 mr-2" />
                            Phone Support
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Monday - Friday</span>
                              <span>9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Saturday</span>
                              <span>10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sunday</span>
                              <span>Closed</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-4">
                            +91 8080808080
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Response Times</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Live Chat</span>
                              <span>Immediate</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Email</span>
                              <span>Within 24 hours</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Phone</span>
                              <span>During business hours</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Community Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with other users, share tips, and get help from the community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center p-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">User Forum</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ask questions and share knowledge with other users
                </p>
                <Button variant="outline" size="sm">Join Forum</Button>
              </Card>

              <Card className="text-center p-6">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Discord Community</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Real-time chat with our team and community members
                </p>
                <Button variant="outline" size="sm">Join Discord</Button>
              </Card>

              <Card className="text-center p-6">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Blog & Updates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with latest features and best practices
                </p>
                <Button variant="outline" size="sm">Read Blog</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Our support team is here to help you succeed with OneTap Repost Engine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}