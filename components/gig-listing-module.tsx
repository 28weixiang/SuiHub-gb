'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Coins } from 'lucide-react'

interface Gig {
  id: string
  title: string
  description: string
  date: string
  location: string
  maxAttendees: number
  payment: number
  category: string
  organizer: string
}

export function GigListingModule() {
  const [gigs, setGigs] = useState<Gig[]>([
    {
      id: '1',
      title: 'Web3 Developer Meetup',
      description: 'Join us for an evening of blockchain development discussions and networking.',
      date: '2024-01-15',
      location: 'San Francisco, CA',
      maxAttendees: 50,
      payment: 100,
      category: 'Technology',
      organizer: '0x1234...5678'
    },
    {
      id: '2',
      title: 'DeFi Workshop',
      description: 'Learn about decentralized finance protocols and yield farming strategies.',
      date: '2024-01-20',
      location: 'New York, NY',
      maxAttendees: 30,
      payment: 150,
      category: 'Education',
      organizer: '0x9876...5432'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGig, setNewGig] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    payment: '',
    category: ''
  })

  const handleCreateGig = () => {
    const gig: Gig = {
      id: Date.now().toString(),
      title: newGig.title,
      description: newGig.description,
      date: newGig.date,
      location: newGig.location,
      maxAttendees: parseInt(newGig.maxAttendees),
      payment: parseFloat(newGig.payment),
      category: newGig.category,
      organizer: '0xYour...Address'
    }

    setGigs([...gigs, gig])
    setNewGig({
      title: '',
      description: '',
      date: '',
      location: '',
      maxAttendees: '',
      payment: '',
      category: ''
    })
    setShowCreateForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gig Listings</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create New Gig'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Gig</CardTitle>
            <CardDescription>Fill in the details for your new gig listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newGig.title}
                  onChange={(e) => setNewGig({...newGig, title: e.target.value})}
                  placeholder="Enter gig title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newGig.category}
                  onChange={(e) => setNewGig({...newGig, category: e.target.value})}
                  placeholder="e.g., Technology, Education"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newGig.description}
                onChange={(e) => setNewGig({...newGig, description: e.target.value})}
                placeholder="Describe your gig"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newGig.date}
                  onChange={(e) => setNewGig({...newGig, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={newGig.maxAttendees}
                  onChange={(e) => setNewGig({...newGig, maxAttendees: e.target.value})}
                  placeholder="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment (SUI)</Label>
                <Input
                  id="payment"
                  type="number"
                  step="0.01"
                  value={newGig.payment}
                  onChange={(e) => setNewGig({...newGig, payment: e.target.value})}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newGig.location}
                onChange={(e) => setNewGig({...newGig, location: e.target.value})}
                placeholder="City, State"
              />
            </div>

            <Button onClick={handleCreateGig} className="w-full">
              Create Gig
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gigs.map((gig) => (
          <Card key={gig.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{gig.title}</CardTitle>
                <Badge variant="secondary">{gig.category}</Badge>
              </div>
              <CardDescription>{gig.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                {new Date(gig.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {gig.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                Max {gig.maxAttendees} attendees
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Coins className="h-4 w-4" />
                {gig.payment} SUI
              </div>
              <div className="pt-2">
                <Button className="w-full">Join Gig</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
