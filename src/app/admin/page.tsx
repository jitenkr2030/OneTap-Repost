'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  email: string
  name: string
  role: string
  status: string
  createdAt: string
  lastLoginAt?: string
  subscription?: {
    planId: string
    status: string
    endDate: string
  }
  stats: {
    listingsCount: number
    repostsCount: number
    leadsCount: number
  }
}

interface SuspiciousActivity {
  id: string
  userId: string
  userEmail: string
  type: string
  description: string
  severity: 'low' | 'medium' | 'high'
  timestamp: string
  status: 'pending' | 'reviewed' | 'resolved'
}

interface PlatformStats {
  name: string
  totalPosts: number
  activeUsers: number
  successRate: number
  avgResponseTime: number
  issues: number
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalListings: number
  totalReposts: number
  totalLeads: number
  revenue: number
  flaggedActivities: number
  systemHealth: 'good' | 'warning' | 'critical'
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [activities, setActivities] = useState<SuspiciousActivity[]>([])
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([])
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      // Mock data for demonstration
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'john@example.com',
          name: 'John Doe',
          role: 'USER',
          status: 'ACTIVE',
          createdAt: '2024-01-15T00:00:00Z',
          lastLoginAt: '2024-01-20T10:30:00Z',
          subscription: {
            planId: 'weekly',
            status: 'ACTIVE',
            endDate: '2024-01-27T00:00:00Z'
          },
          stats: {
            listingsCount: 12,
            repostsCount: 45,
            leadsCount: 23
          }
        },
        {
          id: '2',
          email: 'jane@example.com',
          name: 'Jane Smith',
          role: 'USER',
          status: 'ACTIVE',
          createdAt: '2024-01-10T00:00:00Z',
          lastLoginAt: '2024-01-19T15:45:00Z',
          subscription: {
            planId: 'daily',
            status: 'ACTIVE',
            endDate: '2024-01-21T00:00:00Z'
          },
          stats: {
            listingsCount: 8,
            repostsCount: 32,
            leadsCount: 15
          }
        },
        {
          id: '3',
          email: 'suspicious@example.com',
          name: 'Suspicious User',
          role: 'USER',
          status: 'ACTIVE',
          createdAt: '2024-01-18T00:00:00Z',
          lastLoginAt: '2024-01-20T02:15:00Z',
          stats: {
            listingsCount: 45,
            repostsCount: 200,
            leadsCount: 2
          }
        }
      ]

      const mockActivities: SuspiciousActivity[] = [
        {
          id: '1',
          userId: '3',
          userEmail: 'suspicious@example.com',
          type: 'HIGH_VOLUME_POSTING',
          description: 'User created 45 listings and 200 reposts in 2 days',
          severity: 'high',
          timestamp: '2024-01-20T02:15:00Z',
          status: 'pending'
        },
        {
          id: '2',
          userId: '1',
          userEmail: 'john@example.com',
          type: 'FAILED_LOGIN_ATTEMPTS',
          description: 'Multiple failed login attempts detected',
          severity: 'medium',
          timestamp: '2024-01-19T23:30:00Z',
          status: 'reviewed'
        }
      ]

      const mockPlatformStats: PlatformStats[] = [
        {
          name: 'Facebook',
          totalPosts: 1250,
          activeUsers: 89,
          successRate: 94.5,
          avgResponseTime: 2.3,
          issues: 3
        },
        {
          name: 'Instagram',
          totalPosts: 890,
          activeUsers: 76,
          successRate: 91.2,
          avgResponseTime: 3.1,
          issues: 7
        },
        {
          name: 'OLX',
          totalPosts: 2100,
          activeUsers: 120,
          successRate: 87.8,
          avgResponseTime: 4.2,
          issues: 12
        }
      ]

      const mockSystemStats: SystemStats = {
        totalUsers: 1247,
        activeUsers: 892,
        totalListings: 3456,
        totalReposts: 12890,
        totalLeads: 2341,
        revenue: 456780,
        flaggedActivities: 23,
        systemHealth: 'good'
      }

      setUsers(mockUsers)
      setActivities(mockActivities)
      setPlatformStats(mockPlatformStats)
      setSystemStats(mockSystemStats)
    } catch (error) {
      console.error('Admin data fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: 'ban' | 'suspend' | 'activate') => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'activate' ? 'ACTIVE' : action === 'ban' ? 'BANNED' : 'SUSPENDED' }
          : user
      ))
    } catch (error) {
      console.error('User action error:', error)
    }
  }

  const handleActivityAction = async (activityId: string, action: 'resolve' | 'review') => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setActivities(prev => prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: action === 'resolve' ? 'resolved' : 'reviewed' }
          : activity
      ))
    } catch (error) {
      console.error('Activity action error:', error)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500">Active</Badge>
      case 'SUSPENDED':
        return <Badge className="bg-yellow-500">Suspended</Badge>
      case 'BANNED':
        return <Badge className="bg-red-500">Banned</Badge>
      case 'INACTIVE':
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
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
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* System Overview */}
        {systemStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {systemStats.activeUsers} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  systemStats.systemHealth === 'good' ? 'text-green-600' :
                  systemStats.systemHealth === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemStats.systemHealth.charAt(0).toUpperCase() + systemStats.systemHealth.slice(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {systemStats.flaggedActivities} flagged activities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{(systemStats.revenue / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalListings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {systemStats.totalReposts.toLocaleString()} reposts
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, subscriptions, and access levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MODERATOR">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                      <SelectItem value="BANNED">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Users Table */}
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-600">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusBadge(user.status)}
                                <Badge variant="outline">{user.role}</Badge>
                                {user.subscription && (
                                  <Badge variant="secondary">
                                    {user.subscription.planId}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-right">
                              <p className="font-medium">{user.stats.listingsCount}</p>
                              <p className="text-gray-500">Listings</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{user.stats.repostsCount}</p>
                              <p className="text-gray-500">Reposts</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{user.stats.leadsCount}</p>
                              <p className="text-gray-500">Leads</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatDate(user.createdAt)}</p>
                              <p className="text-gray-500">Joined</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {user.status === 'ACTIVE' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUserAction(user.id, 'suspend')}
                                >
                                  Suspend
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleUserAction(user.id, 'ban')}
                                >
                                  Ban
                                </Button>
                              </>
                            )}
                            {user.status !== 'ACTIVE' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'activate')}
                              >
                                Activate
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Fraud Detection</CardTitle>
                <CardDescription>
                  Monitor suspicious activities and manage security alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <Card key={activity.id} className={`border-l-4 ${
                      activity.severity === 'high' ? 'border-red-500' :
                      activity.severity === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                    }`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <AlertTriangle className={`h-6 w-6 ${
                              activity.severity === 'high' ? 'text-red-500' :
                              activity.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                            }`} />
                            <div>
                              <h3 className="font-medium">{activity.type.replace('_', ' ')}</h3>
                              <p className="text-sm text-gray-500">{activity.userEmail}</p>
                              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              {getSeverityBadge(activity.severity)}
                              <p className="text-sm text-gray-500 mt-1">
                                {formatDate(activity.timestamp)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {activity.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleActivityAction(activity.id, 'review')}
                                  >
                                    Review
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleActivityAction(activity.id, 'resolve')}
                                  >
                                    Resolve
                                  </Button>
                                </>
                              )}
                              {activity.status === 'reviewed' && (
                                <Badge className="bg-yellow-500">Reviewed</Badge>
                              )}
                              {activity.status === 'resolved' && (
                                <Badge className="bg-green-500">Resolved</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>
                  Monitor platform health and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformStats.map((platform) => (
                    <Card key={platform.name}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{platform.name}</h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span>{platform.totalPosts.toLocaleString()} total posts</span>
                              <span>•</span>
                              <span>{platform.activeUsers} active users</span>
                              <span>•</span>
                              <span>{platform.successRate.toFixed(1)}% success rate</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-right">
                              <p className="font-medium">{platform.avgResponseTime}s</p>
                              <p className="text-gray-500">Avg Response</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{platform.issues}</p>
                              <p className="text-gray-500">Issues</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {platform.issues > 10 ? (
                                <Badge className="bg-red-500">Critical</Badge>
                              ) : platform.issues > 5 ? (
                                <Badge className="bg-yellow-500">Warning</Badge>
                              ) : (
                                <Badge className="bg-green-500">Healthy</Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>
                  Comprehensive system performance and usage analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Advanced Analytics Dashboard
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Detailed analytics charts and reports would be displayed here
                  </p>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}