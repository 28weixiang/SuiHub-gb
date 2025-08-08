'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Users, Calendar, MapPin, Star, Code, Gamepad2, Camera, Music, Trophy, Briefcase } from 'lucide-react'

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  activeGigs: number
  upcomingEvents: number
  rating: number
  category: string
  logoUrl: string
  isJoined: boolean
  president: string
  established: string
  achievements: string[]
}

export function CampusCommunities() {
  const [communities] = useState<Community[]>([
    {
      id: '1',
      name: 'APU Blockchain Society',
      description: 'Leading the Web3 revolution at Asia Pacific University. We organize hackathons, workshops, and networking events for blockchain enthusiasts.',
      memberCount: 342,
      activeGigs: 12,
      upcomingEvents: 4,
      rating: 4.9,
      category: 'Technology',
      logoUrl: '/placeholder-logo.png',
      isJoined: true,
      president: 'Sarah Chen',
      established: '2019',
      achievements: ['Best Tech Club 2023', 'Most Active Community', 'Innovation Award']
    },
    {
      id: '2',
      name: 'APU Hackathon Club',
      description: 'Where coding meets creativity! Join us for intense coding competitions, skill-building workshops, and collaborative projects.',
      memberCount: 289,
      activeGigs: 8,
      upcomingEvents: 6,
      rating: 4.8,
      category: 'Programming',
      logoUrl: '/placeholder-logo.png',
      isJoined: true,
      president: 'Mike Mentzer',
      established: '2018',
      achievements: ['Microsoft Partnership', 'Hackathon Champions', 'Top Coding Club']
    },
    {
      id: '3',
      name: 'APU Gaming & Esports',
      description: 'Competitive gaming and esports community. Participate in tournaments, game development projects, and gaming events.',
      memberCount: 456,
      activeGigs: 6,
      upcomingEvents: 3,
      rating: 4.7,
      category: 'Gaming',
      logoUrl: '/placeholder-logo.png',
      isJoined: false,
      president: 'Alex Wong',
      established: '2020',
      achievements: ['National Esports Champions', 'Game Dev Showcase Winner']
    },
    {
      id: '4',
      name: 'APU Multimedia Society',
      description: 'Creative hub for digital artists, video editors, and multimedia enthusiasts. Work on real projects and build your portfolio.',
      memberCount: 234,
      activeGigs: 15,
      upcomingEvents: 2,
      rating: 4.6,
      category: 'Creative',
      logoUrl: '/placeholder-logo.png',
      isJoined: false,
      president: 'Lisa Kumar',
      established: '2017',
      achievements: ['Best Creative Portfolio', 'Industry Collaboration Award']
    },
    {
      id: '5',
      name: 'APU Entrepreneurship Club',
      description: 'For future business leaders and startup founders. Network with industry professionals and develop your business ideas.',
      memberCount: 198,
      activeGigs: 9,
      upcomingEvents: 5,
      rating: 4.5,
      category: 'Business',
      logoUrl: '/placeholder-logo.png',
      isJoined: false,
      president: 'David Tan',
      established: '2016',
      achievements: ['Startup Incubator Partner', 'Best Business Plan Award']
    },
    {
      id: '6',
      name: 'APU Music & Arts Society',
      description: 'Express your creativity through music, arts, and cultural events. Organize concerts, art exhibitions, and cultural festivals.',
      memberCount: 167,
      activeGigs: 4,
      upcomingEvents: 3,
      rating: 4.4,
      category: 'Arts',
      logoUrl: '/placeholder-logo.png',
      isJoined: false,
      president: 'Emma Rodriguez',
      established: '2015',
      achievements: ['Cultural Excellence Award', 'Best Arts Festival']
    },
    {
      id: '7',
      name: 'APU Cybersecurity Club',
      description: 'Learn ethical hacking, cybersecurity practices, and participate in CTF competitions. Build skills for the digital security field.',
      memberCount: 145,
      activeGigs: 7,
      upcomingEvents: 2,
      rating: 4.8,
      category: 'Security',
      logoUrl: '/placeholder-logo.png',
      isJoined: true,
      president: 'Ryan Lee',
      established: '2021',
      achievements: ['CTF Champions', 'Security Excellence Award']
    },
    {
      id: '8',
      name: 'APU Data Science Society',
      description: 'Explore the world of data analytics, machine learning, and AI. Work on real-world data projects and research.',
      memberCount: 203,
      activeGigs: 11,
      upcomingEvents: 4,
      rating: 4.7,
      category: 'Data Science',
      logoUrl: '/placeholder-logo.png',
      isJoined: false,
      president: 'Priya Sharma',
      established: '2020',
      achievements: ['AI Innovation Award', 'Best Research Project']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Technology', 'Programming', 'Gaming', 'Creative', 'Business', 'Arts', 'Security', 'Data Science']

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleJoinCommunity = (communityId: string) => {
    console.log('Joining community:', communityId)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology': return Code
      case 'Programming': return Code
      case 'Gaming': return Gamepad2
      case 'Creative': return Camera
      case 'Business': return Briefcase
      case 'Arts': return Music
      case 'Security': return Trophy
      case 'Data Science': return Trophy
      default: return Users
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">APU Campus Communities</h2>
          <p className="text-gray-600">Join student clubs and societies at Asia Pacific University</p>
        </div>
        <Button>Create New Club</Button>
      </div>

      {/* APU Info Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <img src="/placeholder-logo.png" alt="APU Logo" className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Asia Pacific University of Technology & Innovation</h3>
              <p className="text-blue-100">Malaysia's Premier Private University • Technology • Innovation • Creativity</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span>🏆 Award-Winning University</span>
                <span>🌏 International Recognition</span>
                <span>💡 Innovation Hub</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search APU clubs and societies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCommunities.map((community) => {
          const CategoryIcon = getCategoryIcon(community.category)
          return (
            <Card key={community.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={community.logoUrl || "/placeholder.svg"} alt={community.name} />
                    <AvatarFallback>
                      <CategoryIcon className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{community.name}</CardTitle>
                      {community.isJoined && (
                        <Badge className="bg-green-500 text-white text-xs">Joined</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      Asia Pacific University
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{community.rating}</span>
                      <span className="text-xs text-gray-500">• Est. {community.established}</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm">{community.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{community.memberCount} members</span>
                  </div>
                  <Badge variant="secondary">{community.category}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="font-semibold text-blue-600">{community.activeGigs}</p>
                    <p className="text-gray-600">Active Gigs</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="font-semibold text-green-600">{community.upcomingEvents}</p>
                    <p className="text-gray-600">Events</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-gray-600 mb-1">President: <span className="font-medium">{community.president}</span></p>
                  <div className="flex flex-wrap gap-1">
                    {community.achievements.slice(0, 2).map((achievement, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  {community.isJoined ? (
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Activities
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => handleJoinCommunity(community.id)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Join Club
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mike's Leadership */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-600" />
            Student Leadership Spotlight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2%20-%20Copy-k4xzlbMA1a79uOiM4JMiGizXRLJzk5.png" alt="Mike Mentzer" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">Mike Mentzer</h3>
              <p className="text-orange-600 font-medium">President, APU Hackathon Club</p>
              <p className="text-sm text-gray-600 mt-1">
                Leading APU's most active programming community with 10+ hackathons organized and 66 events participated.
              </p>
              <Badge className="mt-2 bg-orange-500 text-white">Hack-Master Supreme the Third</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
