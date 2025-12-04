'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  Zap, 
  Globe, 
  Award, 
  Lightbulb,
  Heart,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO & Founder',
    bio: 'Former product manager at leading tech companies with 10+ years of experience in marketplace platforms.',
    image: '👨‍💼'
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    bio: 'Full-stack developer and AI specialist with expertise in automation and platform integrations.',
    image: '👩‍💻'
  },
  {
    name: 'Amit Patel',
    role: 'Head of Engineering',
    bio: 'Senior engineer with background in scalable systems and API development.',
    image: '👨‍🔧'
  },
  {
    name: 'Sneha Reddy',
    role: 'Head of Product',
    bio: 'Product designer focused on user experience and workflow optimization.',
    image: '👩‍🎨'
  },
  {
    name: 'Vikram Singh',
    role: 'Lead Developer',
    bio: 'Backend specialist with expertise in database design and system architecture.',
    image: '👨‍💻'
  },
  {
    name: 'Ananya Gupta',
    role: 'Marketing Lead',
    bio: 'Digital marketing expert with experience in SaaS and marketplace growth.',
    image: '👩‍💼'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We prioritize our customers\' success and build products that solve real problems.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries and explore new ways to automate and optimize.'
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'We build robust systems that our customers can depend on 24/7.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and diverse perspectives.'
  }
]

const milestones = [
  {
    year: '2023',
    title: 'Founded',
    description: 'OneTap Repost Engine was founded with a vision to simplify cross-platform posting.'
  },
  {
    year: '2023 Q2',
    title: 'Beta Launch',
    description: 'Launched beta version with initial 5 platform integrations.'
  },
  {
    year: '2023 Q3',
    title: 'First 1000 Users',
    description: 'Reached our first 1000 active users milestone.'
  },
  {
    year: '2023 Q4',
    title: 'Platform Expansion',
    description: 'Expanded to support 25+ platforms across multiple categories.'
  },
  {
    year: '2024 Q1',
    title: 'Advanced Analytics',
    description: 'Launched comprehensive analytics and reporting features.'
  },
  {
    year: '2024 Q2',
    title: 'Enterprise Launch',
    description: 'Introduced enterprise plans with custom integrations and dedicated support.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About OneTap Repost Engine
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              We\'re on a mission to help businesses grow by automating their cross-platform posting and maximizing their reach.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Join Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower businesses of all sizes to reach their full potential by eliminating repetitive tasks and maximizing their online presence across multiple platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Focus</h3>
              <p className="text-sm text-gray-600">
                Specialized in cross-platform automation and marketplace integration
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Speed</h3>
              <p className="text-sm text-gray-600">
                Rapid development and deployment of new features and integrations
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Reach</h3>
              <p className="text-sm text-gray-600">
                Global platform support with local market expertise
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">
                Committed to delivering the best user experience and results
              </p>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our decisions and shape our culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate individuals working together to build something amazing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Milestones Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our growth story
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8">
                    <Card className="p-6">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="mr-2">{milestone.year}</Badge>
                        <h3 className="font-semibold">{milestone.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>
                  
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center z-10">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Platform Integrations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
                <div className="text-gray-600">Posts Automated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Revolutionizing Cross-Platform Posting
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Be part of our journey as we continue to innovate and help businesses grow their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Get Started Free
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                View Careers
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}