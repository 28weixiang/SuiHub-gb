'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { User, Briefcase, Calendar, Award, Star, MapPin, Trophy, Code, Zap, Target } from 'lucide-react'

interface StudentProfile {
  name: string
  title: string
  university: string
  walletAddress: string
  studentId: string
  year: number
  program: string
  totalGigs: number
  totalEvents: number
  totalHackathons: number
  totalEarnings: number
  reputationScore: number
  badges: NFTBadge[]
  completedGigs: CompletedGig[]
  attendedEvents: AttendedEvent[]
  skills: string[]
  achievements: string[]
}

interface NFTBadge {
  id: string
  name: string
  eventName: string
  imageUrl: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  mintDate: string
}

interface CompletedGig {
  id: string
  title: string
  payment: number
  completedDate: string
  rating: number
  category: string
}

interface AttendedEvent {
  id: string
  title: string
  date: string
  organizer: string
  badgeEarned: boolean
  type: string
}

export function StudentProfile() {
  const [profile] = useState<StudentProfile>({
    name: 'Mike Mentzer',
    title: 'Hack-Master Supreme the Third',
    university: 'Asia Pacific University of Technology & Innovation',
    walletAddress: '0x080779...abcdef',
    studentId: 'TP080779',
    year: 3,
    program: 'Computer Science (Hons)',
    totalGigs: 23,
    totalEvents: 66,
    totalHackathons: 10,
    totalEarnings: 3450,
    reputationScore: 4.9,
    skills: ['React.js', 'Solidity', 'Python', 'Node.js', 'Blockchain', 'Smart Contracts'],
    achievements: ['Microsoft Certified', 'Hackathon Champion', 'Club President', 'Top Performer'],
    badges: [
      {
        id: '1',
        name: 'Hackathon Champion',
        eventName: 'APU Blockchain Hackathon 2024',
        imageUrl: '/web3-developer-badge-gold.png',
        rarity: 'legendary',
        mintDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Microsoft Certified',
        eventName: 'Microsoft Azure Workshop',
        imageUrl: '/defi-scholar-badge-purple.png',
        rarity: 'epic',
        mintDate: '2024-01-20'
      },
      {
        id: '3',
        name: 'Web3 Pioneer',
        eventName: 'Sui Blockchain Workshop',
        imageUrl: '/web3-developer-badge-gold.png',
        rarity: 'rare',
        mintDate: '2024-02-01'
      },
      {
        id: '4',
        name: 'Code Master',
        eventName: 'Programming Competition',
        imageUrl: '/defi-scholar-badge-purple.png',
        rarity: 'epic',
        mintDate: '2024-02-10'
      }
    ],
    completedGigs: [
      {
        id: '1',
        title: 'Smart Contract Development',
        payment: 800,
        completedDate: '2024-01-10',
        rating: 5,
        category: 'Blockchain'
      },
      {
        id: '2',
        title: 'React Frontend Development',
        payment: 650,
        completedDate: '2024-01-05',
        rating: 5,
        category: 'Web Development'
      },
      {
        id: '3',
        title: 'Hackathon Mentoring',
        payment: 400,
        completedDate: '2023-12-20',
        rating: 5,
        category: 'Education'
      }
    ],
    attendedEvents: [
      {
        id: '1',
        title: 'APU Blockchain Hackathon 2024',
        date: '2024-01-15',
        organizer: 'APU Blockchain Society',
        badgeEarned: true,
        type: 'Hackathon'
      },
      {
        id: '2',
        title: 'Microsoft Azure Workshop',
        date: '2024-01-20',
        organizer: 'APU Tech Club',
        badgeEarned: true,
        type: 'Workshop'
      },
      {
        id: '3',
        title: 'Sui Developer Meetup',
        date: '2024-02-01',
        organizer: 'APU Blockchain Society',
        badgeEarned: true,
        type: 'Meetup'
      },
      {
        id: '4',
        title: 'Programming Competition Finals',
        date: '2024-02-10',
        organizer: 'APU Hackathon Club',
        badgeEarned: true,
        type: 'Competition'
      }
    ]
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500'
      case 'rare': return 'bg-blue-500'
      case 'epic': return 'bg-purple-500'
      case 'legendary': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case 'common': return 1
      case 'rare': return 2
      case 'epic': return 3
      case 'legendary': return 4
      default: return 1
    }
  }

  return (
    <div className="space-y-6">
      {/* Mike's Player Card */}
      <div className="space-y-6">
        {/* Player Card Display */}
        <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Full Player Card Image */}
              <div className="w-full max-w-md mx-auto">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2%20-%20Copy-k4xzlbMA1a79uOiM4JMiGizXRLJzk5.png"
                  alt="Mike Mentzer Player Card"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              {/* Card Details Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-center text-white">
                  <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                  <Badge className="bg-white/20 text-white mb-3 text-lg px-4 py-2">
                    {profile.title}
                  </Badge>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/80">Level</p>
                      <p className="font-semibold">Degree - Year {profile.year}</p>
                    </div>
                    <div>
                      <p className="text-white/80">Student ID</p>
                      <p className="font-semibold">{profile.studentId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Player Card Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-blue-600" />
              Player Card Stats
            </CardTitle>
            <CardDescription>Official APU student achievement card</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{profile.totalHackathons}</div>
                <p className="text-sm text-gray-600">Hackathons Participated</p>
                <Badge className="mt-2 bg-blue-500 text-white">Champion Level</Badge>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{profile.totalEvents}</div>
                <p className="text-sm text-gray-600">Events Participated</p>
                <Badge className="mt-2 bg-green-500 text-white">Most Active</Badge>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
                <p className="text-sm text-gray-600">Competition Wins</p>
                <Badge className="mt-2 bg-orange-500 text-white">Winner</Badge>
              </div>
            </div>
            
            {/* Card Achievements */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                Card Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-500 text-white">Hackathon Champion</Badge>
                <Badge className="bg-blue-500 text-white">Microsoft Certified</Badge>
                <Badge className="bg-purple-500 text-white">Event Organizer</Badge>
                <Badge className="bg-green-500 text-white">Club President</Badge>
              </div>
            </div>

            {/* University Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <img src="/placeholder-logo.png" alt="APU Logo" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-semibold">{profile.university}</h4>
                  <p className="text-sm text-gray-600">{profile.program}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>Reputation: {profile.reputationScore}/5.0</span>
                    <span>Wallet: {profile.walletAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{profile.totalGigs}</p>
            <p className="text-sm text-gray-600">Gigs Completed</p>
            <Badge variant="secondary" className="mt-2">Top 5%</Badge>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{profile.totalEvents}</p>
            <p className="text-sm text-gray-600">Events Attended</p>
            <Badge variant="secondary" className="mt-2">Most Active</Badge>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{profile.totalHackathons}</p>
            <p className="text-sm text-gray-600">Hackathons Won</p>
            <Badge variant="secondary" className="mt-2">Champion</Badge>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{profile.badges.length}</p>
            <p className="text-sm text-gray-600">NFT Badges</p>
            <Badge variant="secondary" className="mt-2">Collector</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Skills & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NFT Badge Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            NFT Badge Collection
          </CardTitle>
          <CardDescription>Verified credentials from hackathons and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {profile.badges.map((badge) => (
              <div key={badge.id} className="text-center group hover:scale-105 transition-transform">
                <div className="relative">
                  <img
                    src={badge.imageUrl || "/placeholder.svg"}
                    alt={badge.name}
                    className="w-24 h-24 mx-auto rounded-xl border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                  />
                  <Badge 
                    className={`absolute -top-2 -right-2 ${getRarityColor(badge.rarity)} text-white text-xs`}
                  >
                    {Array.from({ length: getRarityStars(badge.rarity) }).map((_, i) => (
                      <Star key={i} className="h-2 w-2 fill-current inline" />
                    ))}
                  </Badge>
                </div>
                <p className="font-semibold text-sm mt-3">{badge.name}</p>
                <p className="text-xs text-gray-600">{badge.eventName}</p>
                <p className="text-xs text-gray-500">{new Date(badge.mintDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Completed Gigs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Recent Gigs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.completedGigs.map((gig) => (
              <div key={gig.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold">{gig.title}</p>
                  <p className="text-sm text-gray-600">{gig.category}</p>
                  <p className="text-xs text-gray-500">{new Date(gig.completedDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{gig.payment} SUI</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: gig.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Attended Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.attendedEvents.map((event) => (
              <div key={event.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.organizer}</p>
                  <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">{event.type}</Badge>
                  {event.badgeEarned && (
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-green-600">Badge Earned</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
