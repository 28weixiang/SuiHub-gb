'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Award, Star, Calendar, Users } from 'lucide-react'

interface NFTBadge {
  id: string
  name: string
  description: string
  gigTitle: string
  eventDate: string
  attendeeCount: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  imageUrl: string
  mintedCount: number
  maxSupply: number
  attributes: { trait_type: string; value: string }[]
}

export function NFTBadgeModule() {
  const [badges, setBadges] = useState<NFTBadge[]>([
    {
      id: '1',
      name: 'Web3 Pioneer',
      description: 'Awarded to early adopters who attended the first Web3 Developer Meetup',
      gigTitle: 'Web3 Developer Meetup',
      eventDate: '2024-01-15',
      attendeeCount: 45,
      rarity: 'rare',
      imageUrl: '/web3-developer-badge-gold.png',
      mintedCount: 45,
      maxSupply: 50,
      attributes: [
        { trait_type: 'Event Type', value: 'Meetup' },
        { trait_type: 'Technology', value: 'Blockchain' },
        { trait_type: 'Rarity', value: 'Rare' }
      ]
    },
    {
      id: '2',
      name: 'DeFi Scholar',
      description: 'Earned by completing the comprehensive DeFi Workshop',
      gigTitle: 'DeFi Workshop',
      eventDate: '2024-01-20',
      attendeeCount: 28,
      rarity: 'epic',
      imageUrl: '/defi-scholar-badge-purple.png',
      mintedCount: 28,
      maxSupply: 30,
      attributes: [
        { trait_type: 'Event Type', value: 'Workshop' },
        { trait_type: 'Technology', value: 'DeFi' },
        { trait_type: 'Rarity', value: 'Epic' }
      ]
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    gigTitle: '',
    eventDate: '',
    maxSupply: '',
    rarity: 'common' as const
  })

  const handleCreateBadge = () => {
    const badge: NFTBadge = {
      id: Date.now().toString(),
      name: newBadge.name,
      description: newBadge.description,
      gigTitle: newBadge.gigTitle,
      eventDate: newBadge.eventDate,
      attendeeCount: 0,
      rarity: newBadge.rarity,
      imageUrl: `/placeholder.svg?height=200&width=200&query=${newBadge.name.toLowerCase().replace(/\s+/g, '+')}+badge`,
      mintedCount: 0,
      maxSupply: parseInt(newBadge.maxSupply),
      attributes: [
        { trait_type: 'Event Type', value: 'Custom' },
        { trait_type: 'Rarity', value: newBadge.rarity }
      ]
    }

    setBadges([...badges, badge])
    setNewBadge({
      name: '',
      description: '',
      gigTitle: '',
      eventDate: '',
      maxSupply: '',
      rarity: 'common'
    })
    setShowCreateForm(false)
  }

  const handleMintBadge = (id: string) => {
    setBadges(badges.map(badge => 
      badge.id === id && badge.mintedCount < badge.maxSupply
        ? { ...badge, mintedCount: badge.mintedCount + 1, attendeeCount: badge.attendeeCount + 1 }
        : badge
    ))
  }

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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">NFT Attendance Badges</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Badge'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create NFT Badge</CardTitle>
            <CardDescription>Design a new attendance badge for your gig</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Badge Name</Label>
                <Input
                  id="name"
                  value={newBadge.name}
                  onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                  placeholder="e.g., Web3 Pioneer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gigTitle">Associated Gig</Label>
                <Input
                  id="gigTitle"
                  value={newBadge.gigTitle}
                  onChange={(e) => setNewBadge({...newBadge, gigTitle: e.target.value})}
                  placeholder="Gig title"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newBadge.description}
                onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                placeholder="Describe what this badge represents"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={newBadge.eventDate}
                  onChange={(e) => setNewBadge({...newBadge, eventDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSupply">Max Supply</Label>
                <Input
                  id="maxSupply"
                  type="number"
                  value={newBadge.maxSupply}
                  onChange={(e) => setNewBadge({...newBadge, maxSupply: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rarity">Rarity</Label>
                <select
                  id="rarity"
                  value={newBadge.rarity}
                  onChange={(e) => setNewBadge({...newBadge, rarity: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
            </div>

            <Button onClick={handleCreateBadge} className="w-full">
              Create Badge Template
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => (
          <Card key={badge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{badge.name}</CardTitle>
                <Badge className={`${getRarityColor(badge.rarity)} text-white`}>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: getRarityStars(badge.rarity) }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                    {badge.rarity.toUpperCase()}
                  </div>
                </Badge>
              </div>
              <CardDescription>{badge.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={badge.imageUrl || "/placeholder.svg"}
                  alt={badge.name}
                  className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
                />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{badge.gigTitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{badge.mintedCount} / {badge.maxSupply} minted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span>{badge.attendeeCount} attendees</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Minting Progress</span>
                  <span>{Math.round((badge.mintedCount / badge.maxSupply) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(badge.mintedCount / badge.maxSupply) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full" 
                  onClick={() => handleMintBadge(badge.id)}
                  disabled={badge.mintedCount >= badge.maxSupply}
                >
                  {badge.mintedCount >= badge.maxSupply ? 'Sold Out' : 'Mint Badge'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
