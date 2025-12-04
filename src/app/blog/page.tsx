'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  User, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: "The Future of Cross-Platform Posting: Trends to Watch in 2024",
    excerpt: "Explore the latest trends in social media automation and cross-platform posting strategies that will shape the future of digital marketing.",
    content: "Full article content here...",
    author: "Rajesh Kumar",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Industry Trends",
    tags: ["automation", "social media", "marketing"],
    featured: true,
    image: "📱"
  },
  {
    id: 2,
    title: "How to Optimize Your Listings for Maximum Engagement",
    excerpt: "Learn proven strategies to create compelling listings that attract more views, clicks, and leads across all platforms.",
    content: "Full article content here...",
    author: "Priya Sharma",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Tips & Tricks",
    tags: ["optimization", "engagement", "listings"],
    featured: false,
    image: "📈"
  },
  {
    id: 3,
    title: "Understanding Platform Algorithms: What Works Where",
    excerpt: "Deep dive into how different platform algorithms work and how to tailor your content for maximum reach.",
    content: "Full article content here...",
    author: "Amit Patel",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Strategy",
    tags: ["algorithms", "platforms", "strategy"],
    featured: true,
    image: "🧠"
  },
  {
    id: 4,
    title: "Case Study: How a Small Business Increased Sales by 300%",
    excerpt: "Real-world example of how a local business used OneTap Repost Engine to dramatically increase their online presence and sales.",
    content: "Full article content here...",
    author: "Sneha Reddy",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Case Studies",
    tags: ["case study", "success story", "business growth"],
    featured: false,
    image: "📊"
  },
  {
    id: 5,
    title: "The Psychology of Effective Online Listings",
    excerpt: "Understanding the psychological triggers that make people click, engage, and convert on your online listings.",
    content: "Full article content here...",
    author: "Vikram Singh",
    date: "2023-12-20",
    readTime: "9 min read",
    category: "Marketing",
    tags: ["psychology", "marketing", "conversion"],
    featured: false,
    image: "🎯"
  },
  {
    id: 6,
    title: "Automation vs. Manual Posting: Finding the Right Balance",
    excerpt: "Exploring the pros and cons of automated posting and when to add a personal touch to your social media strategy.",
    content: "Full article content here...",
    author: "Ananya Gupta",
    date: "2023-12-15",
    readTime: "5 min read",
    category: "Strategy",
    tags: ["automation", "strategy", "social media"],
    featured: false,
    image: "⚖️"
  }
]

const categories = [
  "All",
  "Industry Trends",
  "Tips & Tricks",
  "Strategy",
  "Case Studies",
  "Marketing"
]

const popularTags = [
  "automation",
  "social media",
  "marketing",
  "strategy",
  "optimization",
  "engagement",
  "algorithms",
  "platforms"
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and strategies for mastering cross-platform posting and growing your business
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Popular tags:</span>
            {popularTags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setSearchTerm(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </section>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">{post.image}</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default">Featured</Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">All Articles</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {blogPosts.length} articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    {post.featured && <Badge variant="default">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or category filter
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get the latest insights, tips, and industry trends delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Join 10,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </section>
      </main>
    </div>
  )
}