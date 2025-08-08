'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, Users, Calendar, Briefcase, Award, Coins, Star, Trophy, Zap } from 'lucide-react'
import { SmartRecommendations } from '@/components/smart-recommendations'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: number
  network: string
}

interface DashboardStatsProps {
  walletState: WalletState
}

export function DashboardStats({ walletState }: DashboardStatsProps) {
  if (!walletState.isConnected) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet to Get Started</h3>
          <p className="text-gray-600 mb-4">
            Connect your Sui wallet to access gigs, attend events, and earn NFT credentials at APU
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <Briefcase className="h-6 w-6 mx-auto mb-1 text-blue-600" />
              <p className="font-medium">Find Gigs</p>
            </div>
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-1 text-green-600" />
              <p className="font-medium">Join Events</p>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 mx-auto mb-1 text-purple-600" />
              <p className="font-medium">Earn NFTs</p>
            </div>
            <div className="text-center">
              <Coins className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
              <p className="font-medium">Get Paid</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const stats = [
    {
      title: 'Available Gigs',
      value: '18',
      change: '+5 new',
      trend: 'up',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'APU Events',
      value: '12',
      change: '+3 this week',
      trend: 'up',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Students',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'NFTs Minted',
      value: '1,234',
      change: '+28 today',
      trend: 'up',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Message - Mike Mentzer */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2%20-%20Copy-k4xzlbMA1a79uOiM4JMiGizXRLJzk5.png" 
                  alt="Mike Mentzer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Welcome back, Mike! 👋</h2>
                <p className="text-blue-100 mb-2">
                  Hack-Master Supreme the Third • APU Hackathon Club President
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    10 Hackathons Won
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    66 Events Attended
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Your Balance</p>
              <p className="text-3xl font-bold">{walletState.balance.toFixed(2)} SUI</p>
              <Badge className="bg-white/20 text-white mt-2">
                <Star className="h-3 w-3 mr-1 fill-current" />
                4.9 Rating
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mike's Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200 bg-blue-50/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Find Premium Gigs</h3>
            <p className="text-sm text-gray-600 mb-3">High-paying blockchain & development projects</p>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">18 gigs match your skills</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200 bg-green-50/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Upcoming Hackathons</h3>
            <p className="text-sm text-gray-600 mb-3">Lead and participate in coding competitions</p>
            <Progress value={70} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">3 hackathons this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-purple-50/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Mentor Students</h3>
            <p className="text-sm text-gray-600 mb-3">Share your expertise with junior students</p>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">15 mentoring requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Smart Recommendations */}
      <SmartRecommendations />

      {/* APU Highlights */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-600" />
            APU Campus Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-gray-600">Active Student Clubs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2,847</div>
              <p className="text-gray-600">Registered Students</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <p className="text-gray-600">Events This Semester</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
