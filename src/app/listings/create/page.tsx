'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload, 
  X, 
  Plus, 
  MapPin, 
  DollarSign, 
  Calendar,
  Clock,
  Zap,
  Target,
  Image as ImageIcon,
  Video,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video' | 'document'
}

interface Platform {
  id: string
  name: string
  icon: string
  connected: boolean
}

const categories = [
  { value: 'PROPERTY', label: 'Property' },
  { value: 'VEHICLES', label: 'Vehicles' },
  { value: 'MOBILES_ELECTRONICS', label: 'Mobiles & Electronics' },
  { value: 'JOBS', label: 'Jobs' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'RENTALS', label: 'Rentals' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'PETS', label: 'Pets' },
  { value: 'GENERAL_SALES', label: 'General Sales' }
]

const platforms: Platform[] = [
  { id: 'facebook', name: 'Facebook Marketplace', icon: '📘', connected: true },
  { id: 'olx', name: 'OLX', icon: '🟠', connected: false },
  { id: 'instagram', name: 'Instagram', icon: '📷', connected: true },
  { id: 'telegram', name: 'Telegram', icon: '✈️', connected: true },
  { id: 'whatsapp', name: 'WhatsApp Business', icon: '💬', connected: false },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: true }
]

export default function CreateListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    latitude: '',
    longitude: ''
  })
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook'])
  const [scheduleType, setScheduleType] = useState<'now' | 'later' | 'recurring'>('now')
  const [scheduleTime, setScheduleTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document'
      }
      setMediaFiles(prev => [...prev, mediaFile])
    })
  }

  const removeMediaFile = (id: string) => {
    setMediaFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate form
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (mediaFiles.length === 0) {
      setError('Please upload at least one media file')
      setLoading(false)
      return
    }

    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform')
      setLoading(false)
      return
    }

    try {
      // Simulate API call with progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      setSuccess(true)

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Listing creation error:', error)
      setError('Failed to create listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Listing Created Successfully!
              </h2>
              <p className="text-gray-600 mb-4">
                Your listing has been created and will be posted to your selected platforms.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Posted to {selectedPlatforms.length} platforms</p>
                <p>• {mediaFiles.length} media files uploaded</p>
                <p>• Redirecting to dashboard...</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <h1 className="text-2xl font-bold text-gray-900">Create New Listing</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details about your listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item or service in detail"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="Enter location or address"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Upload */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media Files</CardTitle>
                  <CardDescription>
                    Upload images, videos, or documents to showcase your listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop files here or click to upload</p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, MP4, PDF (Max 10MB each)
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf"
                      onChange={handleMediaUpload}
                      className="hidden"
                      id="media-upload"
                    />
                    <Label htmlFor="media-upload">
                      <Button type="button" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Choose Files
                      </Button>
                    </Label>
                  </div>

                  {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mediaFiles.map((file) => (
                        <div key={file.id} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            {file.type === 'image' && (
                              <img
                                src={file.preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            )}
                            {file.type === 'video' && (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            {file.type === 'document' && (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMediaFile(file.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs">
                            {file.file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Platform Selection */}
            <TabsContent value="platforms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Platforms</CardTitle>
                  <CardDescription>
                    Choose where you want to post your listing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {platforms.map((platform) => (
                      <div
                        key={platform.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPlatforms.includes(platform.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${!platform.connected ? 'opacity-50' : ''}`}
                        onClick={() => platform.connected && togglePlatform(platform.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{platform.icon}</span>
                            <div>
                              <h3 className="font-medium">{platform.name}</h3>
                              <p className="text-sm text-gray-500">
                                {platform.connected ? 'Connected' : 'Not connected'}
                              </p>
                            </div>
                          </div>
                          {selectedPlatforms.includes(platform.id) && (
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Selected:</strong> {selectedPlatforms.length} platforms
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scheduling */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Posting</CardTitle>
                  <CardDescription>
                    Choose when to post your listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        scheduleType === 'now' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setScheduleType('now')}
                    >
                      <div className="text-center">
                        <Zap className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="font-medium">Post Now</h3>
                        <p className="text-sm text-gray-500">Immediate posting</p>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        scheduleType === 'later' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setScheduleType('later')}
                    >
                      <div className="text-center">
                        <Clock className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="font-medium">Schedule Later</h3>
                        <p className="text-sm text-gray-500">Choose specific time</p>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        scheduleType === 'recurring' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setScheduleType('recurring')}
                    >
                      <div className="text-center">
                        <Target className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="font-medium">Recurring</h3>
                        <p className="text-sm text-gray-500">Auto-repost regularly</p>
                      </div>
                    </div>
                  </div>

                  {scheduleType === 'later' && (
                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Schedule Time</Label>
                      <Input
                        id="schedule-time"
                        type="datetime-local"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  )}

                  {scheduleType === 'recurring' && (
                    <div className="space-y-2">
                      <Label>Recurring Options</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Progress Bar */}
          {loading && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Creating listing...</span>
                <span className="text-sm text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex justify-between">
            <Link href="/dashboard">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}