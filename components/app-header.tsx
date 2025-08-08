'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WalletConnection } from '@/components/wallet-connection'
import { Bell, Search, Menu, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: number
  network: string
}

interface AppHeaderProps {
  onWalletChange: (wallet: WalletState) => void
  walletState: WalletState
}

export function AppHeader({ onWalletChange, walletState }: AppHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SuiHub
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Student Gig Platform</p>
              </div>
            </div>
            
            {walletState.isConnected && (
              <Badge variant="secondary" className="hidden md:flex">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Connected to Sui
              </Badge>
            )}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search gigs, events, or students..."
                className="pl-10 bg-gray-50 border-0 focus:bg-white"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            {walletState.isConnected && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                  3
                </Badge>
              </Button>
            )}

            {/* Wallet Connection */}
            <WalletConnection onWalletChange={onWalletChange} />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search gigs, events, or students..."
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
