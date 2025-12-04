'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Building,
  MessageCircle,
  CheckCircle,
  Send,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch with our team",
    value: "support@onetaprepost.com",
    link: "mailto:support@onetaprepost.com"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Monday to Friday, 9 AM to 6 PM",
    value: "+91 8080808080",
    link: "tel:+918080808080"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters in Bangalore",
    value: "Bangalore, India",
    link: "#"
  }
]

const officeLocations = [
  {
    city: "Bangalore",
    address: "123 Tech Park, Electronic City, Bangalore - 560100",
    phone: "+91 8080808080",
    email: "bangalore@onetaprepost.com",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM"
  },
  {
    city: "Mumbai",
    address: "456 Business Hub, Andheri East, Mumbai - 400069",
    phone: "+91 9090909090",
    email: "mumbai@onetaprepost.com",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM"
  },
  {
    city: "Delhi",
    address: "789 Corporate Tower, Connaught Place, Delhi - 110001",
    phone: "+91 7070707070",
    email: "delhi@onetaprepost.com",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM"
  }
]

const teamContacts = [
  {
    name: "Sales Team",
    email: "sales@onetaprepost.com",
    description: "For pricing, demos, and partnership inquiries"
  },
  {
    name: "Support Team",
    email: "support@onetaprepost.com",
    description: "For technical support and platform assistance"
  },
  {
    name: "Partnerships",
    email: "partnerships@onetaprepost.com",
    description: "For integration and partnership opportunities"
  },
  {
    name: "Press & Media",
    email: "press@onetaprepost.com",
    description: "For media inquiries and press releases"
  }
]

const faqs = [
  {
    question: "How quickly can I get started with OneTap Repost Engine?",
    answer: "You can get started immediately! Sign up takes less than 2 minutes, and you can start creating listings and connecting your platforms right away. We also offer a 7-day free trial with 50 free reposts."
  },
  {
    question: "What platforms do you support?",
    answer: "We support 50+ platforms including Facebook, Instagram, WhatsApp, Telegram, OLX, LinkedIn, and many more. We're constantly adding new platforms based on customer demand."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use bank-level encryption to protect your data and platform credentials. We're GDPR compliant and follow industry best practices for data security and privacy."
  },
  {
    question: "Do you offer enterprise plans?",
    answer: "Yes, we offer custom enterprise plans with dedicated support, custom integrations, SLA guarantees, and advanced features. Contact our sales team for a customized quote."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period, with no long-term commitments."
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    department: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        department: ''
      })
    } catch (error) {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <info.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600 mb-4">{info.description}</p>
                <a 
                  href={info.link}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {info.value}
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form and Office Locations */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-red-800">{error}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="partnerships">Partnerships</SelectItem>
                          <SelectItem value="press">Press & Media</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start space-x-4">
                        <Building className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{office.city}</h3>
                          <p className="text-gray-600 mb-2">{office.address}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{office.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{office.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Team Contacts */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Our Teams</h2>
                <div className="space-y-4">
                  {teamContacts.map((team, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{team.name}</h3>
                          <p className="text-sm text-gray-600">{team.description}</p>
                        </div>
                        <a 
                          href={`mailto:${team.email}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {team.email}
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our platform and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of businesses who are already saving time and growing their reach with OneTap Repost Engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              Schedule a Demo
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}