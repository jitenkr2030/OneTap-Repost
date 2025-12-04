'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Plus, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Settings,
  AlertTriangle,
  Facebook,
  Instagram,
  MessageCircle,
  Linkedin,
  ShoppingBag,
  Send
} from 'lucide-react'
import Link from 'next/link'

interface Platform {
  id: string
  name: string
  type: string
  isActive: boolean
  config?: any
}

interface PlatformAccount {
  id: string
  platformId: string
  username?: string
  email?: string
  status: string
  lastSyncAt?: string
  platform: Platform
  config?: any
}

interface PlatformConfig {
  [key: string]: {
    name: string
    type: string
    baseUrl: string
    apiUrl: string
    authUrl: string
    scopes: string[]
  }
}

const platformIcons: { [key: string]: any } = {
  facebook: Facebook,
  instagram: Instagram,
  telegram: Send,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  olx: ShoppingBag
}

export default function AccountsPage() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<PlatformAccount[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [configs, setConfigs] = useState<PlatformConfig>({})
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [disconnecting, setDisconnecting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts')
      if (response.ok) {
        const data = await response.json()
        setAccounts(data.accounts)
        setPlatforms(data.platforms)
        setConfigs(data.configs)
      } else {
        setError('Failed to fetch accounts')
      }
    } catch (error) {
      console.error('Fetch accounts error:', error)
      setError('An error occurred while fetching accounts')
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId)
    setError('')
    setSuccess('')

    try {
      const config = configs[platformId]
      if (!config) {
        setError('Platform configuration not found')
        return
      }

      // In a real implementation, you would redirect to the OAuth authorization URL
      // For now, we'll simulate the OAuth flow
      const mockAuthCode = `mock_auth_code_${Date.now()}`
      
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platformId,
          authCode: mockAuthCode,
          redirectUri: `${window.location.origin}/accounts/callback`
        }),
      })

      if (response.ok) {
        setSuccess(`${config.name} connected successfully!`)
        fetchAccounts()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to connect account')
      }
    } catch (error) {
      console.error('Connect account error:', error)
      setError('An error occurred while connecting the account')
    } finally {
      setConnecting(null)
    }
  }

  const handleDisconnect = async (accountId: string) => {
    setDisconnecting(accountId)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/accounts?accountId=${accountId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Account disconnected successfully')
        fetchAccounts()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to disconnect account')
      }
    } catch (error) {
      console.error('Disconnect account error:', error)
      setError('An error occurred while disconnecting the account')
    } finally {
      setDisconnecting(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>
      case 'INACTIVE':
        return <Badge variant="secondary">Inactive</Badge>
      case 'EXPIRED':
        return <Badge variant="destructive">Expired</Badge>
      case 'ERROR':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPlatformIcon = (platformId: string) => {
    const IconComponent = platformIcons[platformId] || Settings
    return <IconComponent className="h-6 w-6" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading accounts...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Connected Accounts</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {/* Connected Accounts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
            {accounts.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Connected Accounts
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Connect your social media and marketplace accounts to start posting
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {accounts.map((account) => (
                  <Card key={account.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getPlatformIcon(account.platformId)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{account.platform.name}</CardTitle>
                            <CardDescription>
                              {account.username || account.email || 'Connected Account'}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(account.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(account.id)}
                            disabled={disconnecting === account.id}
                          >
                            {disconnecting === account.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          Last sync: {account.lastSyncAt 
                            ? new Date(account.lastSyncAt).toLocaleDateString()
                            : 'Never'
                          }
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-1" />
                            Settings
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={account.platform.baseUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Available Platforms */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const isConnected = accounts.some(acc => acc.platformId === platform.id)
                const config = configs[platform.id]
                const IconComponent = platformIcons[platform.id] || Settings

                return (
                  <Card key={platform.id} className={isConnected ? 'opacity-50' : ''}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{platform.name}</CardTitle>
                            <CardDescription>{platform.type}</CardDescription>
                          </div>
                        </div>
                        {isConnected && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          {config?.name || platform.name}
                        </p>
                        <Button
                          className="w-full"
                          onClick={() => handleConnect(platform.id)}
                          disabled={isConnected || connecting === platform.id}
                        >
                          {connecting === platform.id ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Connecting...
                            </>
                          ) : isConnected ? (
                            'Connected'
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Learn more about connecting your accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Why connect accounts?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Post to multiple platforms automatically</li>
                  <li>• Track performance across all channels</li>
                  <li>• Manage all your listings from one place</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is it secure?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• We use OAuth 2.0 for secure authentication</li>
                  <li>• Your credentials are never stored</li>
                  <li>• You can disconnect anytime</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}