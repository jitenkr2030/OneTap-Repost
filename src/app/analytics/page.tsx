'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  MessageSquare,
  DollarSign,
  Calendar,
  Target,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface AnalyticsData {
  overview: {
    totalListings: number
    totalViews: number
    totalClicks: number
    totalLeads: number
    totalRevenue: number
    avgSuccessRate: number
    period: string
  }
  platformPerformance: Array<{
    name: string
    posts: number
    views: number
    clicks: number
    leads: number
    successRate: number
  }>
  categoryPerformance: Array<{
    category: string
    listings: number
    views: number
    leads: number
    avgSuccessRate: number
  }>
  timeSeriesData: Array<{
    date: string
    views: number
    clicks: number
    leads: number
    listingsPosted: number
    successRate: number
    revenue: number
  }>
  topListings: Array<{
    id: string
    title: string
    category: string
    views: number
    leads: number
    platforms: number
    createdAt: string
    successRate: number
  }>
  listings: Array<any>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30d')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?period=${period}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Analytics fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAnalytics()
    setRefreshing(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading analytics...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {analytics && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.overview.totalListings}</div>
                  <p className="text-xs text-muted-foreground">
                    {analytics.overview.period}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalViews)}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all platforms
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalClicks)}</div>
                  <p className="text-xs text-muted-foreground">
                    Link clicks
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.overview.totalLeads}</div>
                  <p className="text-xs text-muted-foreground">
                    Total inquiries
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.overview.avgSuccessRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Average success rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(analytics.overview.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    Total revenue
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Analytics Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="listings">Top Listings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6">
                  {/* Performance Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>
                        Your listing performance over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={analytics.timeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis />
                          <Tooltip 
                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                            formatter={(value: number, name: string) => [
                              formatNumber(value), 
                              name === 'views' ? 'Views' : 
                              name === 'leads' ? 'Leads' : 
                              name === 'listingsPosted' ? 'Listings Posted' : name
                            ]}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="views" 
                            stackId="1" 
                            stroke="#3b82f6" 
                            fill="#3b82f6" 
                            fillOpacity={0.6}
                            name="Views"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="leads" 
                            stackId="2" 
                            stroke="#10b981" 
                            fill="#10b981"
                            fillOpacity={0.6}
                            name="Leads"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="listingsPosted" 
                            stackId="3" 
                            stroke="#8b5cf6" 
                            fill="#8b5cf6"
                            fillOpacity={0.6}
                            name="Listings Posted"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Time Series Data */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Performance</CardTitle>
                      <CardDescription>
                        Breakdown of daily metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analytics.timeSeriesData.slice(-7).map((day, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-6 text-sm">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3 text-blue-500" />
                                <span>{formatNumber(day.views)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-3 w-3 text-green-500" />
                                <span>{day.leads}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="h-3 w-3 text-purple-500" />
                                <span>{day.listingsPosted}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                    <CardDescription>
                      How your listings perform across different platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.platformPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => formatNumber(value)} />
                        <Legend />
                        <Bar dataKey="views" fill="#3b82f6" name="Views" />
                        <Bar dataKey="leads" fill="#10b981" name="Leads" />
                        <Bar dataKey="clicks" fill="#f59e0b" name="Clicks" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Details</CardTitle>
                    <CardDescription>
                      Detailed breakdown of platform performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.platformPerformance.map((platform, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="font-semibold text-blue-600">
                                {platform.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{platform.name}</h3>
                              <p className="text-sm text-gray-500">
                                {platform.posts} posts • {platform.successRate.toFixed(1)}% success rate
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-right">
                              <p className="font-medium">{formatNumber(platform.views)}</p>
                              <p className="text-gray-500">Views</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{platform.leads}</p>
                              <p className="text-gray-500">Leads</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{platform.clicks}</p>
                              <p className="text-gray-500">Clicks</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                    <CardDescription>
                      Performance breakdown by listing category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analytics.categoryPerformance}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, percent }) => `${category.replace('_', ' ')} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="views"
                        >
                          {analytics.categoryPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatNumber(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>
                      Detailed breakdown of category performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.categoryPerformance.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="font-semibold text-green-600">
                                {category.category.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{category.category.replace('_', ' ')}</h3>
                              <p className="text-sm text-gray-500">
                                {category.listings} listings • {category.avgSuccessRate.toFixed(1)}% success rate
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-right">
                              <p className="font-medium">{formatNumber(category.views)}</p>
                              <p className="text-gray-500">Views</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{category.leads}</p>
                              <p className="text-gray-500">Leads</p>
                            </div>
                            <Badge variant={category.avgSuccessRate > 80 ? 'default' : 'secondary'}>
                              {category.avgSuccessRate.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Listings</CardTitle>
                    <CardDescription>
                      Your best-performing listings by views and engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topListings.map((listing, index) => (
                        <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-purple-600">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{listing.title}</h3>
                              <p className="text-sm text-gray-500">
                                {listing.category.replace('_', ' ')} • {new Date(listing.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-right">
                              <p className="font-medium">{formatNumber(listing.views)}</p>
                              <p className="text-gray-500">Views</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{listing.leads}</p>
                              <p className="text-gray-500">Leads</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{listing.platforms}</p>
                              <p className="text-gray-500">Platforms</p>
                            </div>
                            <Badge variant={listing.successRate > 80 ? 'default' : 'secondary'}>
                              {listing.successRate.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}