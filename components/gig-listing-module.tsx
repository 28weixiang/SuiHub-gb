'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Coins, Clock, Star, Briefcase } from 'lucide-react'

interface Gig {
  id: string
  title: string
  description: string
  company: string
  duration: string
  location: string
  payment: number
  paymentType: 'hourly' | 'fixed' | 'milestone'
  skillsRequired: string[]
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  deadline: string
  applicants: number
  maxApplicants: number
  category: string
  employer: string
  rating: number
}

export function GigListingModule() {
  const [gigs, setGigs] = useState<Gig[]>([
    {
      id: '1',
      title: 'Smart Contract Development',
      description: 'Develop and deploy smart contracts for a DeFi protocol. Experience with Solidity and Web3 required.',
      company: 'BlockTech Solutions',
      duration: '2-3 weeks',
      location: 'Remote',
      payment: 800,
      paymentType: 'fixed',
      skillsRequired: ['Solidity', 'Web3.js', 'React', 'Node.js'],
      experienceLevel: 'advanced',
      deadline: '2024-02-15',
      applicants: 12,
      maxApplicants: 20,
      category: 'Blockchain Development',
      employer: '0x1234...5678',
      rating: 4.8
    },
    {
      id: '2',
      title: 'React Frontend Developer',
      description: 'Build responsive web application frontend using React and TypeScript. Modern UI/UX design required.',
      company: 'StartupXYZ',
      duration: '1 month',
      location: 'Kuala Lumpur',
      payment: 45,
      paymentType: 'hourly',
      skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
      experienceLevel: 'intermediate',
      deadline: '2024-02-20',
      applicants: 8,
      maxApplicants: 15,
      category: 'Web Development',
      employer: '0x9876...5432',
      rating: 4.6
    },
    {
      id: '3',
      title: 'Mobile App UI/UX Design',
      description: 'Design user interface and experience for a fintech mobile application. Portfolio review required.',
      company: 'FinanceApp Co',
      duration: '3 weeks',
      location: 'Hybrid',
      payment: 600,
      paymentType: 'milestone',
      skillsRequired: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      experienceLevel: 'intermediate',
      deadline: '2024-02-25',
      applicants: 15,
      maxApplicants: 25,
      category: 'UI/UX Design',
      employer: '0x1111...2222',
      rating: 4.9
    },
    {
      id: '4',
      title: 'Python Data Analysis',
      description: 'Analyze customer data and create insights dashboard. Experience with pandas and visualization libraries needed.',
      company: 'DataCorp Analytics',
      duration: '2 weeks',
      location: 'Remote',
      payment: 35,
      paymentType: 'hourly',
      skillsRequired: ['Python', 'Pandas', 'Matplotlib', 'SQL'],
      experienceLevel: 'beginner',
      deadline: '2024-02-18',
      applicants: 6,
      maxApplicants: 10,
      category: 'Data Science',
      employer: '0x3333...4444',
      rating: 4.5
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGig, setNewGig] = useState({
    title: '',
    description: '',
    company: '',
    duration: '',
    location: '',
    payment: '',
    paymentType: 'fixed' as const,
    skillsRequired: '',
    experienceLevel: 'intermediate' as const,
    deadline: '',
    maxApplicants: '',
    category: ''
  })

  const handleCreateGig = () => {
    const gig: Gig = {
      id: Date.now().toString(),
      title: newGig.title,
      description: newGig.description,
      company: newGig.company,
      duration: newGig.duration,
      location: newGig.location,
      payment: parseFloat(newGig.payment),
      paymentType: newGig.paymentType,
      skillsRequired: newGig.skillsRequired.split(',').map(skill => skill.trim()),
      experienceLevel: newGig.experienceLevel,
      deadline: newGig.deadline,
      applicants: 0,
      maxApplicants: parseInt(newGig.maxApplicants),
      category: newGig.category,
      employer: '0xYour...Address',
      rating: 0
    }

    setGigs([...gigs, gig])
    setNewGig({
      title: '',
      description: '',
      company: '',
      duration: '',
      location: '',
      payment: '',
      paymentType: 'fixed',
      skillsRequired: '',
      experienceLevel: 'intermediate',
      deadline: '',
      maxApplicants: '',
      category: ''
    })
    setShowCreateForm(false)
  }

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPaymentDisplay = (gig: Gig) => {
    switch (gig.paymentType) {
      case 'hourly': return `${gig.payment} SUI/hour`
      case 'fixed': return `${gig.payment} SUI total`
      case 'milestone': return `${gig.payment} SUI (milestones)`
      default: return `${gig.payment} SUI`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Available Gigs
          </h2>
          <p className="text-gray-600">Find paid work opportunities that match your skills</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Post New Gig'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Post New Gig</CardTitle>
            <CardDescription>Create a paid work opportunity for students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Gig Title</Label>
                <Input
                  id="title"
                  value={newGig.title}
                  onChange={(e) => setNewGig({...newGig, title: e.target.value})}
                  placeholder="e.g., React Developer Needed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Client</Label>
                <Input
                  id="company"
                  value={newGig.company}
                  onChange={(e) => setNewGig({...newGig, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={newGig.description}
                onChange={(e) => setNewGig({...newGig, description: e.target.value})}
                placeholder="Describe the work requirements and expectations"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newGig.duration}
                  onChange={(e) => setNewGig({...newGig, duration: e.target.value})}
                  placeholder="e.g., 2 weeks"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newGig.location}
                  onChange={(e) => setNewGig({...newGig, location: e.target.value})}
                  placeholder="Remote/City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newGig.category}
                  onChange={(e) => setNewGig({...newGig, category: e.target.value})}
                  placeholder="e.g., Web Development"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Amount</Label>
                <Input
                  id="payment"
                  type="number"
                  step="0.01"
                  value={newGig.payment}
                  onChange={(e) => setNewGig({...newGig, payment: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentType">Payment Type</Label>
                <select
                  id="paymentType"
                  value={newGig.paymentType}
                  onChange={(e) => setNewGig({...newGig, paymentType: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="milestone">Milestone Based</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <select
                  id="experienceLevel"
                  value={newGig.experienceLevel}
                  onChange={(e) => setNewGig({...newGig, experienceLevel: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxApplicants">Max Applicants</Label>
                <Input
                  id="maxApplicants"
                  type="number"
                  value={newGig.maxApplicants}
                  onChange={(e) => setNewGig({...newGig, maxApplicants: e.target.value})}
                  placeholder="20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillsRequired">Skills Required (comma separated)</Label>
                <Input
                  id="skillsRequired"
                  value={newGig.skillsRequired}
                  onChange={(e) => setNewGig({...newGig, skillsRequired: e.target.value})}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGig.deadline}
                  onChange={(e) => setNewGig({...newGig, deadline: e.target.value})}
                />
              </div>
            </div>

            <Button onClick={handleCreateGig} className="w-full">
              Post Gig
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gigs.map((gig) => (
          <Card key={gig.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{gig.title}</CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{gig.company}</p>
                </div>
                <Badge className={`${getExperienceBadgeColor(gig.experienceLevel)} text-white text-xs`}>
                  {gig.experienceLevel.toUpperCase()}
                </Badge>
              </div>
              <CardDescription>{gig.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Coins className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-600">{getPaymentDisplay(gig)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {gig.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {gig.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Deadline: {new Date(gig.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {gig.applicants}/{gig.maxApplicants} applicants
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Skills Required:</p>
                <div className="flex flex-wrap gap-1">
                  {gig.skillsRequired.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{gig.rating > 0 ? gig.rating : 'New'}</span>
                </div>
                <Badge variant="secondary">{gig.category}</Badge>
              </div>

              <div className="pt-2">
                <Button className="w-full" disabled={gig.applicants >= gig.maxApplicants}>
                  {gig.applicants >= gig.maxApplicants ? 'Applications Closed' : 'Apply Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
