'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GigListingModule } from '@/components/gig-listing-module'
import { EscrowModule } from '@/components/escrow-module'
import { NFTBadgeModule } from '@/components/nft-badge-module'
import { Calendar, Shield, Award } from 'lucide-react'

export default function SuiHubPlatform() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SuiHub</h1>
          <p className="text-lg text-gray-600">Decentralized Gig Platform on Sui Blockchain</p>
        </div>

        <Tabs defaultValue="gigs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="gigs" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Gig Listings
            </TabsTrigger>
            <TabsTrigger value="escrow" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Escrow Payments
            </TabsTrigger>
            <TabsTrigger value="nft" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              NFT Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gigs">
            <GigListingModule />
          </TabsContent>

          <TabsContent value="escrow">
            <EscrowModule />
          </TabsContent>

          <TabsContent value="nft">
            <NFTBadgeModule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
