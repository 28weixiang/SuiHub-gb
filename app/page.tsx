'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppHeader } from '@/components/app-header'
import { DashboardStats } from '@/components/dashboard-stats'
import { GigListingModule } from '@/components/gig-listing-module'
import { EventsModule } from '@/components/events-module'
import { EscrowModule } from '@/components/escrow-module'
import { NFTBadgeModule } from '@/components/nft-badge-module'
import { StudentProfile } from '@/components/student-profile'
import { CampusCommunities } from '@/components/campus-communities'
import { StudentShowcase } from '@/components/student-showcase'
import { Calendar, Shield, Award, User, Users, Home, Sparkles, Briefcase } from 'lucide-react'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: number
  network: string
}

export default function SuiHubPlatform() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    network: 'mainnet'
  })

  const handleWalletChange = (newWalletState: WalletState) => {
    setWalletState(newWalletState)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AppHeader onWalletChange={handleWalletChange} walletState={walletState} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="gigs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Gigs</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="escrow" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Escrow</span>
            </TabsTrigger>
            <TabsTrigger value="nft" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">NFT Badges</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="communities" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Communities</span>
            </TabsTrigger>
            <TabsTrigger value="showcase" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Showcase</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats walletState={walletState} />
          </TabsContent>

          <TabsContent value="gigs" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <GigListingModule />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <EventsModule />
            </div>
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <EscrowModule />
            </div>
          </TabsContent>

          <TabsContent value="nft" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <NFTBadgeModule />
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <StudentProfile />
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <CampusCommunities />
            </div>
          </TabsContent>

          <TabsContent value="showcase" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <StudentShowcase />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="font-bold text-lg">SuiHub</span>
              </div>
              <p className="text-gray-600 text-sm">
                Decentralized student gig platform powered by Sui blockchain
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Work & Learn</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Find Gigs</li>
                <li>Join Events</li>
                <li>Earn NFTs</li>
                <li>Build Profile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Student Clubs</li>
                <li>APU Campus</li>
                <li>Employers</li>
                <li>Event Organizers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Us</li>
                <li>Bug Reports</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 SuiHub. Built on Sui Blockchain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
