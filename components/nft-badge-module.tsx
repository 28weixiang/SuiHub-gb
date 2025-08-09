"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Star, Calendar, Users, Trophy, Zap, Code, Shield, Target, ExternalLink } from "lucide-react"

interface NFTBadge {
  id: string
  name: string
  description: string
  eventTitle: string
  eventDate: string
  organizer: string
  attendeeCount: number
  rarity: "common" | "rare" | "epic" | "legendary"
  imageUrl: string
  attributes: { trait_type: string; value: string }[]
  earnedDate: string
  transactionHash: string
  tokenId: string
  category: string
}

export function NFTBadgeModule() {
  const [badges] = useState<NFTBadge[]>([
    {
      id: "1",
      name: "Crypto Enthusiast Level 3",
      description: "Awarded to the winner of APU Blockchain Hackathon 2024. Built an innovative DeFi lending protocol.",
      eventTitle: "APU Blockchain Hackathon 2024",
      eventDate: "2024-01-15",
      organizer: "APU Blockchain Society",
      attendeeCount: 89,
      rarity: "legendary",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b7e73f50-df9d-4b35-9e63-27e24af00106-bpPVBTATIIdM55SW9YaXepeiqZBNcy.png",
      earnedDate: "2024-01-15T18:30:00Z",
      transactionHash: "0xabc123...def456",
      tokenId: "#001",
      category: "Competition",
      attributes: [
        { trait_type: "Event Type", value: "Hackathon" },
        { trait_type: "Position", value: "1st Place" },
        { trait_type: "Technology", value: "Blockchain" },
        { trait_type: "Rarity", value: "Legendary" },
        { trait_type: "Year", value: "2024" },
      ],
    },
    {
      id: "2",
      name: "Crypto Researcher Level 4",
      description: "Successfully completed Microsoft Azure Developer certification workshop and passed the assessment.",
      eventTitle: "Microsoft Azure Workshop",
      eventDate: "2024-01-20",
      organizer: "Microsoft & APU Tech Club",
      attendeeCount: 45,
      rarity: "epic",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dcda4b96-19d3-4da9-b99a-1fbda96c2a62-sRSEaYPbsvlwXezw8KU50Xr3cbwQM1.png",
      earnedDate: "2024-01-20T16:45:00Z",
      transactionHash: "0xdef789...ghi012",
      tokenId: "#028",
      category: "Certification",
      attributes: [
        { trait_type: "Event Type", value: "Workshop" },
        { trait_type: "Certification", value: "Microsoft Azure" },
        { trait_type: "Technology", value: "Cloud Computing" },
        { trait_type: "Rarity", value: "Epic" },
      ],
    },
    {
      id: "3",
      name: "Blockchain Developer Level 2",
      description: "Early adopter badge for participating in the first Sui blockchain workshop at APU.",
      eventTitle: "Sui Blockchain Workshop",
      eventDate: "2024-02-01",
      organizer: "APU Blockchain Society",
      attendeeCount: 32,
      rarity: "rare",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/214287c1-6df2-49bf-84e7-8d5fa4d61fb8-YnbYofqTqY2XW9McrjZum6XFEkDI2o.png",
      earnedDate: "2024-02-01T14:20:00Z",
      transactionHash: "0xghi345...jkl678",
      tokenId: "#012",
      category: "Workshop",
      attributes: [
        { trait_type: "Event Type", value: "Workshop" },
        { trait_type: "Technology", value: "Sui Blockchain" },
        { trait_type: "Status", value: "Pioneer" },
        { trait_type: "Rarity", value: "Rare" },
      ],
    },
    {
      id: "4",
      name: "Eco Hero Level 2",
      description: "Achieved top score in APU Sustainability Hackathon with innovative green tech solution.",
      eventTitle: "APU Sustainability Hackathon 2024",
      eventDate: "2024-02-10",
      organizer: "APU Environmental Club",
      attendeeCount: 67,
      rarity: "epic",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cdeb8410-9e0d-4ce9-965c-0efd6222dcca-P2aBaOrhuQaC4CZKXRHS3GIrzVmNey.png",
      earnedDate: "2024-02-10T15:30:00Z",
      transactionHash: "0xjkl901...mno234",
      tokenId: "#045",
      category: "Competition",
      attributes: [
        { trait_type: "Event Type", value: "Competition" },
        { trait_type: "Skill", value: "Sustainability" },
        { trait_type: "Achievement", value: "Top Score" },
        { trait_type: "Rarity", value: "Epic" },
      ],
    },
    {
      id: "7",
      name: "Eco Champion Level 1",
      description:
        "Awarded for outstanding contribution to APU Green Tech Challenge. Developed innovative renewable energy solution.",
      eventTitle: "APU Green Tech Challenge 2024",
      eventDate: "2024-01-25",
      organizer: "APU Environmental Club",
      attendeeCount: 54,
      rarity: "rare",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc5e5e8b-4fe1-41b8-a514-ac851b6e773f-nRlxXuigtZa1HsQeE5G70k3LPgBdNH.png",
      earnedDate: "2024-01-25T14:15:00Z",
      transactionHash: "0xstu789...vwx012",
      tokenId: "#078",
      category: "Environmental",
      attributes: [
        { trait_type: "Event Type", value: "Challenge" },
        { trait_type: "Focus", value: "Green Technology" },
        { trait_type: "Level", value: "1" },
        { trait_type: "Rarity", value: "Rare" },
      ],
    },
    {
      id: "8",
      name: "Eco Champion Level 1",
      description:
        "Recognized for innovative sustainability solution in campus-wide innovation contest. Promoted environmental awareness.",
      eventTitle: "Sustainability Innovation Contest",
      eventDate: "2024-02-08",
      organizer: "APU Innovation Center",
      attendeeCount: 72,
      rarity: "rare",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fec057dc-5dcd-4719-8341-d9837a1ce166-KHnmr04oE73LMvl9gxO9gGieSPh7R9.png",
      earnedDate: "2024-02-08T16:30:00Z",
      transactionHash: "0xvwx345...yz6789",
      tokenId: "#089",
      category: "Environmental",
      attributes: [
        { trait_type: "Event Type", value: "Contest" },
        { trait_type: "Focus", value: "Sustainability" },
        { trait_type: "Level", value: "1" },
        { trait_type: "Rarity", value: "Rare" },
      ],
    },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case "common":
        return 1
      case "rare":
        return 2
      case "epic":
        return 3
      case "legendary":
        return 4
      default:
        return 1
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Competition":
        return Trophy
      case "Certification":
        return Award
      case "Workshop":
        return Code
      case "Security":
        return Shield
      case "Leadership":
        return Target
      case "Environmental":
        return Target
      default:
        return Award
    }
  }

  const rarityStats = {
    legendary: badges.filter((b) => b.rarity === "legendary").length,
    epic: badges.filter((b) => b.rarity === "epic").length,
    rare: badges.filter((b) => b.rarity === "rare").length,
    common: badges.filter((b) => b.rarity === "common").length,
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          My NFT Badge Collection
        </h2>
        <p className="text-gray-600">Your verified achievements and credentials on the blockchain</p>
      </div>

      {/* Collection Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Collection Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{rarityStats.legendary}</div>
              <div className="text-sm text-gray-600">Legendary</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{rarityStats.epic}</div>
              <div className="text-sm text-gray-600">Epic</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-purple-400 text-purple-400" />
                ))}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{rarityStats.rare}</div>
              <div className="text-sm text-gray-600">Rare</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-blue-400 text-blue-400" />
                ))}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{badges.length}</div>
              <div className="text-sm text-gray-600">Total Badges</div>
              <div className="flex justify-center mt-1">
                <Trophy className="h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge Collection */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => {
          const CategoryIcon = getCategoryIcon(badge.category)
          return (
            <Card key={badge.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                  </div>
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
                  <div className="relative">
                    <img
                      src={badge.imageUrl || "/placeholder.svg"}
                      alt={badge.name}
                      className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                    />
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                      <Badge variant="outline" className="text-xs">
                        {badge.tokenId}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{badge.eventTitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {badge.organizer} • {badge.attendeeCount} participants
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span>Earned: {new Date(badge.earnedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Attributes</h4>
                  <div className="flex flex-wrap gap-1">
                    {badge.attributes.slice(0, 3).map((attr, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {attr.trait_type}: {attr.value}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Chain
                  </Button>
                  <Button size="sm" variant="outline">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Achievement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Achievement Timeline
          </CardTitle>
          <CardDescription>Your journey of earning NFT badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {badges
              .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
              .map((badge, index) => (
                <div key={badge.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={badge.imageUrl || "/placeholder.svg"}
                      alt={badge.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{badge.name}</h4>
                    <p className="text-sm text-gray-600">{badge.eventTitle}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getRarityColor(badge.rarity)} text-white text-xs`}>{badge.rarity}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{new Date(badge.earnedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
