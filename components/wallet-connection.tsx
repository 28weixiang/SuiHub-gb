'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Wallet, Copy, ExternalLink, LogOut, User, Settings } from 'lucide-react'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: number
  network: string
}

interface WalletConnectionProps {
  onWalletChange: (wallet: WalletState) => void
}

export function WalletConnection({ onWalletChange }: WalletConnectionProps) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    network: 'mainnet'
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockWallet: WalletState = {
        isConnected: true,
        address: '0x1234567890abcdef1234567890abcdef12345678',
        balance: 1250.75,
        network: 'mainnet'
      }
      setWallet(mockWallet)
      onWalletChange(mockWallet)
      setIsConnecting(false)
    }, 2000)
  }

  const disconnectWallet = () => {
    const disconnectedWallet: WalletState = {
      isConnected: false,
      address: null,
      balance: 0,
      network: 'mainnet'
    }
    setWallet(disconnectedWallet)
    onWalletChange(disconnectedWallet)
  }

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!wallet.isConnected) {
    return (
      <Button 
        onClick={connectWallet} 
        disabled={isConnecting}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              <Wallet className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{formatAddress(wallet.address!)}</span>
            <span className="text-xs text-gray-500">{wallet.balance.toFixed(2)} SUI</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-3">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                <Wallet className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Connected Wallet</p>
              <p className="text-sm text-gray-500">{formatAddress(wallet.address!)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Card className="p-2">
              <p className="text-xs text-gray-500">Balance</p>
              <p className="font-semibold">{wallet.balance.toFixed(2)} SUI</p>
            </Card>
            <Card className="p-2">
              <p className="text-xs text-gray-500">Network</p>
              <Badge variant="secondary" className="text-xs">
                {wallet.network}
              </Badge>
            </Card>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User className="h-4 w-4 mr-2" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
