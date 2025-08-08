'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Users, Trophy, Briefcase, GraduationCap } from 'lucide-react'

interface StudentCard {
  id: string
  name: string
  title: string
  level: string
  year: number
  tp: string
  imageUrl: string
  stats: {
    label: string
    value: string | number
  }[]
  achievements: string[]
  color: string
}

export function StudentShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const studentCards: StudentCard[] = [
    {
      id: '1',
      name: 'Nur Iramina',
      title: 'APU Newcomer',
      level: 'Foundations',
      year: 1,
      tp: '085617',
      imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-3mulH0pWqGmAnjiUq1HgEOMkewkcrw.png',
      stats: [
        { label: 'Events Attended', value: 3 },
        { label: 'Gigs Completed', value: 1 },
        { label: 'NFT Badges', value: 2 }
      ],
      achievements: ['First Event Badge', 'Welcome Badge'],
      color: 'from-green-400 to-green-600'
    },
    {
      id: '2',
      name: 'Gaspar Will Jotomo',
      title: 'Comin\' in Clutch',
      level: 'Diploma',
      year: 2,
      tp: '077564',
      imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2-n5nDgoci8A55XfmajzEsbQTU2iuEGn.png',
      stats: [
        { label: 'Jobs Completed', value: 166 },
        { label: 'CGPA', value: '3.85' },
        { label: 'Skills Verified', value: 4 }
      ],
      achievements: ['Top Performer', 'Multimedia Expert', 'Reliable Worker'],
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: '3',
      name: 'Mike Mentzer',
      title: 'Hack-Master Supreme the Third',
      level: 'Degree',
      year: 3,
      tp: '080779',
      imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2%20-%20Copy-k4xzlbMA1a79uOiM4JMiGizXRLJzk5.png',
      stats: [
        { label: 'Hackathons', value: 10 },
        { label: 'Events Participated', value: 66 },
        { label: 'Competition Wins', value: 5 }
      ],
      achievements: ['Hackathon Champion', 'Microsoft Certified', 'Event Organizer'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: '4',
      name: 'Lee Ee Lin',
      title: '6 Years APU Veteran',
      level: 'Masters',
      year: 6,
      tp: '075541',
      imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-1yeHjgNPh0MJ2pln2opm5jizq3HHbV.png',
      stats: [
        { label: 'Jobs Listed', value: 61 },
        { label: 'Clubs Managed', value: 5 },
        { label: 'Mentees', value: 23 }
      ],
      achievements: ['Senior Leader', 'Job Creator', 'Community Builder', 'Mentor'],
      color: 'from-orange-400 to-orange-600'
    }
  ]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % studentCards.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + studentCards.length) % studentCards.length)
  }

  const currentCard = studentCards[currentIndex]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Student Showcase</h2>
        <p className="text-gray-600">Real APU students building their on-chain profiles</p>
      </div>

      {/* Main Card Display */}
      <div className="relative max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={currentCard.imageUrl || "/placeholder.svg"}
            alt={`${currentCard.name} profile card`}
            className="w-full h-auto"
          />
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
          onClick={prevCard}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
          onClick={nextCard}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Card Indicators */}
      <div className="flex justify-center gap-2">
        {studentCards.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Student Details */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{currentCard.name}</CardTitle>
              <CardDescription>{currentCard.title}</CardDescription>
            </div>
            <div className="text-right">
              <Badge className={`bg-gradient-to-r ${currentCard.color} text-white`}>
                {currentCard.level} - Year {currentCard.year}
              </Badge>
              <p className="text-sm text-gray-500 mt-1">TP{currentCard.tp}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {currentCard.stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Achievements
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentCard.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Connect
            </Button>
            <Button variant="outline" className="flex-1">
              <Briefcase className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Level Progression */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Academic Journey on SuiHub
          </CardTitle>
          <CardDescription>How students progress through their university experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studentCards.map((student, index) => (
              <div
                key={student.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                  index === currentIndex ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${student.color}`} />
                <div className="flex-1">
                  <p className="font-semibold">{student.level} - Year {student.year}</p>
                  <p className="text-sm text-gray-600">{student.name}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{student.stats[0].value} {student.stats[0].label.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
