'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MessageSquare, 
  Inbox, 
  Send, 
  Phone, 
  Mail, 
  User,
  Calendar,
  Filter,
  Search,
  Star,
  Archive,
  Trash2,
  Reply,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Eye,
  MoreHorizontal,
  Paperclip,
  Smile,
  AtSign
} from 'lucide-react'
import Link from 'next/link'

interface Lead {
  id: string
  listingId: string
  listingTitle: string
  platformPostId?: string
  platform: string
  contactInfo: string
  message: string
  source: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'SPAM'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  lastContactedAt?: string
  assignedTo?: string
  tags: string[]
  metadata?: {
    device?: string
    location?: string
    referrer?: string
  }
}

interface Conversation {
  id: string
  leadId: string
  messages: Array<{
    id: string
    type: 'incoming' | 'outgoing'
    content: string
    timestamp: string
    sender?: string
  }>
}

interface LeadStats {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  convertedLeads: number
  responseRate: number
  avgResponseTime: number
  topPlatforms: Array<{
    name: string
    count: number
  }>
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [replyMessage, setReplyMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchLeadsData()
  }, [])

  const fetchLeadsData = async () => {
    try {
      // Mock data for demonstration
      const mockLeads: Lead[] = [
        {
          id: '1',
          listingId: '101',
          listingTitle: 'iPhone 13 Pro - Excellent Condition',
          platformPostId: 'fb_post_123',
          platform: 'Facebook Marketplace',
          contactInfo: 'john buyer@example.com',
          message: 'Hi, is this still available? I\'m interested in buying it. Can you tell me more about the condition?',
          source: 'Facebook Marketplace',
          status: 'NEW',
          priority: 'high',
          createdAt: '2024-01-20T10:30:00Z',
          tags: ['hot_lead', 'electronics'],
          metadata: {
            device: 'Mobile',
            location: 'Mumbai, India'
          }
        },
        {
          id: '2',
          listingId: '102',
          listingTitle: '2BHK Apartment in Prime Location',
          platformPostId: 'olx_post_456',
          platform: 'OLX',
          contactInfo: '+91 98765 43210',
          message: 'Hello, I would like to schedule a visit to see the apartment. Please let me know your availability.',
          source: 'OLX',
          status: 'CONTACTED',
          priority: 'medium',
          createdAt: '2024-01-19T15:45:00Z',
          lastContactedAt: '2024-01-19T16:00:00Z',
          assignedTo: 'agent1',
          tags: ['property', 'scheduled_visit'],
          metadata: {
            location: 'Delhi, India',
            referrer: 'OLX App'
          }
        },
        {
          id: '3',
          listingId: '103',
          listingTitle: 'Professional Web Development Services',
          platformPostId: 'linkedin_post_789',
          platform: 'LinkedIn',
          contactInfo: 'ceo@company.com',
          message: 'We are looking for a web development agency for our new project. Can you share your portfolio and pricing?',
          source: 'LinkedIn',
          status: 'QUALIFIED',
          priority: 'high',
          createdAt: '2024-01-18T09:15:00Z',
          lastContactedAt: '2024-01-18T10:00:00Z',
          assignedTo: 'agent2',
          tags: ['b2b', 'high_value', 'web_dev'],
          metadata: {
            referrer: 'LinkedIn Profile'
          }
        },
        {
          id: '4',
          listingId: '104',
          listingTitle: 'Used Car - Maruti Swift',
          platformPostId: 'telegram_post_101',
          platform: 'Telegram',
          contactInfo: 'buyer_telegram',
          message: 'Is the car still available? What\'s the final price?',
          source: 'Telegram',
          status: 'NEW',
          priority: 'low',
          createdAt: '2024-01-20T08:20:00Z',
          tags: ['automotive', 'price_inquiry'],
          metadata: {
            device: 'Desktop'
          }
        }
      ]

      const mockConversations: Conversation[] = [
        {
          id: '1',
          leadId: '2',
          messages: [
            {
              id: '1',
              type: 'incoming',
              content: 'Hello, I would like to schedule a visit to see the apartment. Please let me know your availability.',
              timestamp: '2024-01-19T15:45:00Z'
            },
            {
              id: '2',
              type: 'outgoing',
              content: 'Hi! Thanks for your interest. The apartment is available for viewing. Would you like to schedule a visit this weekend?',
              timestamp: '2024-01-19T16:00:00Z',
              sender: 'agent1'
            }
          ]
        }
      ]

      const mockStats: LeadStats = {
        totalLeads: 234,
        newLeads: 45,
        contactedLeads: 89,
        qualifiedLeads: 67,
        convertedLeads: 33,
        responseRate: 78.5,
        avgResponseTime: 2.3,
        topPlatforms: [
          { name: 'Facebook Marketplace', count: 89 },
          { name: 'OLX', count: 67 },
          { name: 'Instagram', count: 45 },
          { name: 'WhatsApp', count: 33 }
        ]
      }

      setLeads(mockLeads)
      setConversations(mockConversations)
      setStats(mockStats)
    } catch (error) {
      console.error('Leads data fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLeadAction = async (leadId: string, action: 'contact' | 'qualify' | 'convert' | 'spam') => {
    try {
      const statusMap = {
        contact: 'CONTACTED',
        qualify: 'QUALIFIED',
        convert: 'CONVERTED',
        spam: 'SPAM'
      }

      setLeads(prev => prev.map(lead => 
        lead.id === leadId 
          ? { 
              ...lead, 
              status: statusMap[action] as Lead['status'],
              lastContactedAt: action === 'contact' ? new Date().toISOString() : lead.lastContactedAt
            }
          : lead
      ))
    } catch (error) {
      console.error('Lead action error:', error)
    }
  }

  const handleSendReply = async () => {
    if (!selectedLead || !replyMessage.trim()) return

    setSending(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update conversation
      const newMessage = {
        id: Date.now().toString(),
        type: 'outgoing' as const,
        content: replyMessage,
        timestamp: new Date().toISOString(),
        sender: 'current_user'
      }

      setConversations(prev => {
        const conversation = prev.find(c => c.leadId === selectedLead.id)
        if (conversation) {
          return prev.map(c => 
            c.leadId === selectedLead.id 
              ? { ...c, messages: [...c.messages, newMessage] }
              : c
          )
        } else {
          return [...prev, {
            id: Date.now().toString(),
            leadId: selectedLead.id,
            messages: [newMessage]
          }]
        }
      })

      // Update lead status
      setLeads(prev => prev.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, status: 'CONTACTED', lastContactedAt: new Date().toISOString() }
          : lead
      ))

      setReplyMessage('')
    } catch (error) {
      console.error('Send reply error:', error)
    } finally {
      setSending(false)
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.listingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesPlatform = platformFilter === 'all' || lead.platform === platformFilter
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPlatform && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Badge className="bg-blue-500">New</Badge>
      case 'CONTACTED':
        return <Badge className="bg-yellow-500">Contacted</Badge>
      case 'QUALIFIED':
        return <Badge className="bg-purple-500">Qualified</Badge>
      case 'CONVERTED':
        return <Badge className="bg-green-500">Converted</Badge>
      case 'SPAM':
        return <Badge variant="destructive">Spam</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>
      case 'low':
        return <Badge className="bg-gray-500">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  const getConversation = (leadId: string) => {
    return conversations.find(c => c.leadId === leadId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading leads...</p>
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
                <Inbox className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Leads & Inbox</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLeads}</div>
                <p className="text-xs text-muted-foreground">
                  All time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.newLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Need attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.responseRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats.avgResponseTime}h avg response
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qualified</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.qualifiedLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Hot prospects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Converted</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.convertedLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Sales closed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.topPlatforms[0]?.name || 'N/A'}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.topPlatforms[0]?.count || 0} leads
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>
                  Manage and respond to leads from all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
                      <SelectItem value="QUALIFIED">Qualified</SelectItem>
                      <SelectItem value="CONVERTED">Converted</SelectItem>
                      <SelectItem value="SPAM">Spam</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="Facebook Marketplace">Facebook</SelectItem>
                      <SelectItem value="OLX">OLX</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Leads List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredLeads.map((lead) => (
                    <Card 
                      key={lead.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedLead?.id === lead.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium truncate">{lead.listingTitle}</h3>
                                {getPriorityBadge(lead.priority)}
                              </div>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {lead.message}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{lead.platform}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Mail className="h-3 w-3" />
                                  <span>{lead.contactInfo}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatDate(lead.createdAt)}</span>
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                {getStatusBadge(lead.status)}
                                {lead.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {lead.status === 'NEW' && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Details & Conversation */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <Card className="h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Lead Details</CardTitle>
                      <CardDescription>{selectedLead.listingTitle}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(selectedLead.priority)}
                      {getStatusBadge(selectedLead.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Information */}
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{selectedLead.contactInfo}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        <span>{selectedLead.platform}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(selectedLead.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lead Actions */}
                  <div>
                    <h4 className="font-medium mb-2">Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedLead.status === 'NEW' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLeadAction(selectedLead.id, 'contact')}
                        >
                          Mark Contacted
                        </Button>
                      )}
                      {selectedLead.status !== 'QUALIFIED' && selectedLead.status !== 'CONVERTED' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLeadAction(selectedLead.id, 'qualify')}
                        >
                          Qualify
                        </Button>
                      )}
                      {selectedLead.status !== 'CONVERTED' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLeadAction(selectedLead.id, 'convert')}
                        >
                          Convert
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLeadAction(selectedLead.id, 'spam')}
                      >
                        Mark Spam
                      </Button>
                    </div>
                  </div>

                  {/* Conversation */}
                  <div>
                    <h4 className="font-medium mb-2">Conversation</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {getConversation(selectedLead.id)?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.type === 'outgoing'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {formatDate(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reply */}
                  <div>
                    <h4 className="font-medium mb-2">Reply</h4>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Type your reply..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <AtSign className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          onClick={handleSendReply}
                          disabled={sending || !replyMessage.trim()}
                          size="sm"
                        >
                          {sending ? 'Sending...' : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Lead
                    </h3>
                    <p className="text-gray-500">
                      Choose a lead from the list to view details and respond
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}