'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Clock, Star, Award, Zap } from 'lucide-react'
import { EventCalendar } from '@/components/event-calendar'

interface Event {
  id: string
  title: string
  description: string
  organizer: string
  date: string
  time: string
  location: string
  maxAttendees: number
  currentAttendees: number
  eventType: 'workshop' | 'meetup' | 'conference' | 'hackathon' | 'seminar' | 'competition'
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all'
  tags: string[]
  hasNFTBadge: boolean
  registrationDeadline: string
  requirements: string[]
  learningOutcomes: string[]
  rating: number
}

export function EventsModule() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'APU Blockchain Hackathon 2024',
      description: 'Join the biggest blockchain hackathon at APU! Build innovative DeFi solutions and compete for amazing prizes.',
      organizer: 'APU Blockchain Society',
      date: '2024-02-20',
      time: '09:00',
      location: 'APU Main Campus - Tech Hub',
      maxAttendees: 100,
      currentAttendees: 67,
      eventType: 'hackathon',
      category: 'Blockchain',
      difficulty: 'intermediate',
      tags: ['Blockchain', 'DeFi', 'Smart Contracts', 'Competition'],
      hasNFTBadge: true,
      registrationDeadline: '2024-02-15',
      requirements: ['Basic blockchain knowledge', 'Programming experience', 'Team of 2-4 members'],
      learningOutcomes: ['Smart contract development', 'DeFi protocols', 'Team collaboration'],
      rating: 4.9
    },
    {
      id: '2',
      title: 'React.js Workshop for Beginners',
      description: 'Learn the fundamentals of React.js in this hands-on workshop. Perfect for students new to frontend development.',
      organizer: 'APU Web Development Club',
      date: '2024-02-18',
      time: '14:00',
      location: 'APU Computer Lab 3',
      maxAttendees: 30,
      currentAttendees: 22,
      eventType: 'workshop',
      category: 'Web Development',
      difficulty: 'beginner',
      tags: ['React', 'JavaScript', 'Frontend', 'Hands-on'],
      hasNFTBadge: true,
      registrationDeadline: '2024-02-16',
      requirements: ['Basic HTML/CSS knowledge', 'Laptop with VS Code'],
      learningOutcomes: ['React components', 'State management', 'Event handling'],
      rating: 4.7
    },
    {
      id: '3',
      title: 'AI & Machine Learning Seminar',
      description: 'Industry experts share insights on the latest AI trends and career opportunities in machine learning.',
      organizer: 'APU Data Science Society',
      date: '2024-02-22',
      time: '16:00',
      location: 'APU Auditorium',
      maxAttendees: 200,
      currentAttendees: 145,
      eventType: 'seminar',
      category: 'Artificial Intelligence',
      difficulty: 'all',
      tags: ['AI', 'Machine Learning', 'Career', 'Industry Insights'],
      hasNFTBadge: false,
      registrationDeadline: '2024-02-20',
      requirements: ['Interest in AI/ML'],
      learningOutcomes: ['Industry trends', 'Career paths', 'Networking opportunities'],
      rating: 4.8
    },
    {
      id: '4',
      title: 'Cybersecurity CTF Competition',
      description: 'Test your cybersecurity skills in this Capture The Flag competition. Prizes for top performers!',
      organizer: 'APU Cybersecurity Club',
      date: '2024-02-25',
      time: '10:00',
      location: 'APU Security Lab',
      maxAttendees: 50,
      currentAttendees: 38,
      eventType: 'competition',
      category: 'Cybersecurity',
      difficulty: 'advanced',
      tags: ['CTF', 'Security', 'Ethical Hacking', 'Competition'],
      hasNFTBadge: true,
      registrationDeadline: '2024-02-23',
      requirements: ['Cybersecurity fundamentals', 'Linux knowledge', 'Problem-solving skills'],
      learningOutcomes: ['Penetration testing', 'Vulnerability assessment', 'Security tools'],
      rating: 4.6
    },
    {
      id: '5',
      title: 'Startup Pitch Night',
      description: 'Present your startup ideas to industry mentors and potential investors. Great networking opportunity!',
      organizer: 'APU Entrepreneurship Club',
      date: '2024-02-28',
      time: '18:00',
      location: 'APU Innovation Center',
      maxAttendees: 80,
      currentAttendees: 34,
      eventType: 'meetup',
      category: 'Entrepreneurship',
      difficulty: 'all',
      tags: ['Startup', 'Pitch', 'Networking', 'Investment'],
      hasNFTBadge: false,
      registrationDeadline: '2024-02-26',
      requirements: ['Business idea or interest in startups'],
      learningOutcomes: ['Pitching skills', 'Business networking', 'Investor insights'],
      rating: 4.5
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    organizer: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    eventType: 'workshop' as const,
    category: '',
    difficulty: 'all' as const,
    tags: '',
    hasNFTBadge: false,
    registrationDeadline: '',
    requirements: '',
    learningOutcomes: ''
  })

  const handleCreateEvent = () => {
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      organizer: newEvent.organizer,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      maxAttendees: parseInt(newEvent.maxAttendees),
      currentAttendees: 0,
      eventType: newEvent.eventType,
      category: newEvent.category,
      difficulty: newEvent.difficulty,
      tags: newEvent.tags.split(',').map(tag => tag.trim()),
      hasNFTBadge: newEvent.hasNFTBadge,
      registrationDeadline: newEvent.registrationDeadline,
      requirements: newEvent.requirements.split(',').map(req => req.trim()),
      learningOutcomes: newEvent.learningOutcomes.split(',').map(outcome => outcome.trim()),
      rating: 0
    }

    setEvents([...events, event])
    setNewEvent({
      title: '',
      description: '',
      organizer: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      eventType: 'workshop',
      category: '',
      difficulty: 'all',
      tags: '',
      hasNFTBadge: false,
      registrationDeadline: '',
      requirements: '',
      learningOutcomes: ''
    })
    setShowCreateForm(false)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-500'
      case 'meetup': return 'bg-green-500'
      case 'conference': return 'bg-purple-500'
      case 'hackathon': return 'bg-orange-500'
      case 'seminar': return 'bg-indigo-500'
      case 'competition': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      case 'all': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Zap className="h-4 w-4" />
      case 'competition': return <Award className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Campus Events
          </h2>
          <p className="text-gray-600">Discover workshops, meetups, and competitions at APU</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Event'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>Organize a learning or networking event for APU students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g., React Workshop"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                  placeholder="Club or organization name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Describe what participants will learn or do"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                  placeholder="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                <Input
                  id="registrationDeadline"
                  type="date"
                  value={newEvent.registrationDeadline}
                  onChange={(e) => setNewEvent({...newEvent, registrationDeadline: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  value={newEvent.eventType}
                  onChange={(e) => setNewEvent({...newEvent, eventType: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="workshop">Workshop</option>
                  <option value="meetup">Meetup</option>
                  <option value="conference">Conference</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="seminar">Seminar</option>
                  <option value="competition">Competition</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <select
                  id="difficulty"
                  value={newEvent.difficulty}
                  onChange={(e) => setNewEvent({...newEvent, difficulty: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  placeholder="e.g., Web Development"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="APU Campus location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newEvent.tags}
                  onChange={(e) => setNewEvent({...newEvent, tags: e.target.value})}
                  placeholder="React, JavaScript, Frontend"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newEvent.hasNFTBadge}
                    onChange={(e) => setNewEvent({...newEvent, hasNFTBadge: e.target.checked})}
                  />
                  Offers NFT Badge
                </Label>
              </div>
            </div>

            <Button onClick={handleCreateEvent} className="w-full">
              Create Event
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Event Calendar */}
      <EventCalendar />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getEventTypeIcon(event.eventType)}
                    {event.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{event.organizer}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={`${getEventTypeColor(event.eventType)} text-white text-xs`}>
                    {event.eventType.toUpperCase()}
                  </Badge>
                  {event.hasNFTBadge && (
                    <Badge className="bg-purple-500 text-white text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      NFT
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {event.currentAttendees}/{event.maxAttendees} registered
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  Register by {new Date(event.registrationDeadline).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(event.difficulty)}>
                  {event.difficulty === 'all' ? 'All Levels' : event.difficulty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{event.rating > 0 ? event.rating : 'New'}</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{event.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full" 
                  disabled={event.currentAttendees >= event.maxAttendees}
                >
                  {event.currentAttendees >= event.maxAttendees ? 'Event Full' : 'Register Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
