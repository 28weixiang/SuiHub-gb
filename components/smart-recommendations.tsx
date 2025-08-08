'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, TrendingUp, Target, Zap } from 'lucide-react'

export function SmartRecommendations() {
  const recommendations = {
    gigs: [
      {
        id: '1',
        title: 'Advanced Solidity Development',
        match: 95,
        reason: 'Perfect match for your blockchain skills',
        payment: 1200,
        urgency: 'high'
      },
      {
        id: '2', 
        title: 'React + TypeScript Project',
        match: 88,
        reason: 'Matches your frontend expertise',
        payment: 800,
        urgency: 'medium'
      }
    ],
    events: [
      {
        id: '1',
        title: 'Advanced Smart Contract Security',
        match: 92,
        reason: 'Next level from your current skills',
        date: '2024-02-25'
      },
      {
        id: '2',
        title: 'Hackathon Judge Training',
        match: 85,
        reason: 'Leadership opportunity for you',
        date: '2024-03-01'
      }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recommended Gigs */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Target className="h-5 w-5" />
            Recommended Gigs for You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.gigs.map((gig) => (
            <div key={gig.id} className="p-3 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{gig.title}</h4>
                <Badge className="bg-green-500 text-white text-xs">
                  {gig.match}% match
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{gig.reason}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-green-600">{gig.payment} SUI</span>
                <Button size="sm" className="text-xs">Apply Now</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommended Events */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Zap className="h-5 w-5" />
            Skill-Building Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.events.map((event) => (
            <div key={event.id} className="p-3 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{event.title}</h4>
                <Badge className="bg-blue-500 text-white text-xs">
                  {event.match}% match
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{event.reason}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{event.date}</span>
                <Button size="sm" variant="outline" className="text-xs">Register</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
