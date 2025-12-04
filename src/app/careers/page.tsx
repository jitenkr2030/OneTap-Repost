'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Zap, 
  Heart,
  Award,
  Briefcase,
  GraduationCap,
  Coffee,
  Wifi,
  Car,
  HeartHandshake,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    experience: "5+ years",
    salary: "₹25-35 LPA",
    description: "We're looking for a senior full-stack developer to help build and scale our platform. You'll work on cutting-edge technologies and solve complex problems in the automation space.",
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in JavaScript/TypeScript, Node.js, and React",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Knowledge of cloud platforms and DevOps practices",
      "Experience with API design and microservices architecture"
    ],
    niceToHave: [
      "Experience with Prisma or similar ORMs",
      "Knowledge of automation tools and platforms",
      "Experience with social media APIs",
      "Familiarity with queue systems and background jobs"
    ],
    featured: true
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Bangalore",
    type: "Full-time",
    experience: "3+ years",
    salary: "₹20-30 LPA",
    description: "Join our product team to shape the future of cross-platform automation. You'll work closely with engineering, design, and customers to build products that solve real problems.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Experience with B2B SaaS products",
      "Ability to work with technical teams",
      "Excellent communication and leadership skills"
    ],
    niceToHave: [
      "Experience with marketplace or social media platforms",
      "Knowledge of API products and developer tools",
      "Background in automation or workflow tools",
      "Experience with user research and data analysis"
    ],
    featured: false
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Bangalore",
    type: "Full-time",
    experience: "3+ years",
    salary: "₹15-25 LPA",
    description: "We're seeking a talented UI/UX designer to create intuitive and beautiful user experiences for our platform. You'll be responsible for the entire design process from research to implementation.",
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Strong portfolio showcasing web and mobile app designs",
      "Understanding of user-centered design principles",
      "Experience with design systems and component libraries"
    ],
    niceToHave: [
      "Experience with SaaS or enterprise products",
      "Knowledge of frontend development basics",
      "Experience with user research and usability testing",
      "Familiarity with accessibility standards"
    ],
    featured: false
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    experience: "4+ years",
    salary: "₹20-30 LPA",
    description: "Help us build and maintain robust, scalable infrastructure for our growing platform. You'll work on CI/CD, monitoring, and ensuring our services run smoothly 24/7.",
    requirements: [
      "4+ years of experience in DevOps or Site Reliability Engineering",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Knowledge of containerization and orchestration (Docker, Kubernetes)",
      "Experience with CI/CD pipelines and infrastructure as code",
      "Strong scripting skills (Bash, Python, or Go)"
    ],
    niceToHave: [
      "Experience with monitoring and observability tools",
      "Knowledge of security best practices",
      "Experience with serverless architectures",
      "Familiarity with database administration"
    ],
    featured: false
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Bangalore",
    type: "Full-time",
    experience: "4+ years",
    salary: "₹15-25 LPA",
    description: "Lead our marketing efforts to grow our user base and brand presence. You'll develop and execute marketing strategies across multiple channels.",
    requirements: [
      "4+ years of marketing experience, preferably in SaaS",
      "Experience with digital marketing channels (SEO, SEM, social media)",
      "Strong analytical skills and data-driven approach",
      "Experience with marketing automation tools",
      "Excellent communication and project management skills"
    ],
    niceToHave: [
      "Experience with content marketing and thought leadership",
      "Knowledge of product marketing and go-to-market strategies",
      "Familiarity with marketing analytics and attribution",
      "Experience with partner marketing"
    ],
    featured: false
  },
  {
    id: 6,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Bangalore",
    type: "Full-time",
    experience: "2+ years",
    salary: "₹12-20 LPA",
    description: "Ensure our customers get maximum value from our platform. You'll be the primary point of contact for our customers and help them succeed with their goals.",
    requirements: [
      "2+ years of experience in customer success or account management",
      "Excellent communication and interpersonal skills",
      "Ability to understand customer needs and provide solutions",
      "Experience with SaaS products and technical concepts",
      "Strong problem-solving and analytical skills"
    ],
    niceToHave: [
      "Experience with automation or workflow tools",
      "Knowledge of social media marketing",
      "Experience with customer success platforms",
      "Familiarity with data analysis and reporting"
    ],
    featured: false
  }
]

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Salary",
    description: "Above-market compensation with regular reviews and equity options"
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family"
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Annual budget for courses, conferences, and skill development"
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    description: "Remote-friendly culture with flexible working hours"
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work with passionate, talented, and supportive colleagues"
  },
  {
    icon: Zap,
    title: "Cutting-edge Tech",
    description: "Work with the latest technologies and tools"
  },
  {
    icon: Award,
    title: "Performance Bonuses",
    description: "Generous bonus structure based on individual and company performance"
  },
  {
    icon: Briefcase,
    title: "Professional Growth",
    description: "Clear career paths with opportunities for advancement"
  }
]

const perks = [
  { icon: Wifi, title: "High-speed internet allowance" },
  { icon: Car, title: "Transport allowance" },
  { icon: Coffee, title: "Free meals and snacks" },
  { icon: HeartHandshake, title: "Team outings and events" }
]

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  const departments = ["All", "Engineering", "Product", "Design", "Marketing", "Customer Success"]

  const filteredJobs = selectedDepartment === "All" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              We're building the future of cross-platform automation. Join us in our mission to help businesses grow and succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Why Join Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join OneTap Repost Engine?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer more than just a job - we offer a chance to make a real impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Job Openings */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're always looking for talented people to join our team
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {departments.map(dept => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.featured && <Badge variant="default">Featured</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <CardDescription className="text-base">
                        {job.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    >
                      {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </div>
                </CardHeader>
                
                {selectedJob === job.id && (
                  <CardContent className="border-t">
                    <div className="pt-6 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Nice to Have:</h4>
                        <ul className="space-y-2">
                          {job.niceToHave.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button className="flex-1">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline">
                          Share Position
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No positions available</h3>
              <p className="text-gray-500 mb-4">
                There are currently no open positions in this department.
              </p>
              <Button onClick={() => setSelectedDepartment("All")}>
                View All Positions
              </Button>
            </div>
          )}
        </section>

        {/* Perks Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Additional Perks
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We believe in creating an environment where our team can thrive
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {perks.map((perk, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <perk.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{perk.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building a diverse, inclusive, and collaborative workplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Collaborative</h3>
              <p className="text-sm text-gray-600">
                We believe in the power of teamwork and diverse perspectives to solve complex problems.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Zap className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Innovative</h3>
              <p className="text-sm text-gray-600">
                We encourage creativity and out-of-the-box thinking to drive innovation and growth.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Heart className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2">Customer-Focused</h3>
              <p className="text-sm text-gray-600">
                Our customers are at the heart of everything we do. We're committed to their success.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join us in revolutionizing how businesses manage their online presence across multiple platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              Contact HR Team
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}