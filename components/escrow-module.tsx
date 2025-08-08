'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Clock, CheckCircle, XCircle, Coins } from 'lucide-react'

interface EscrowContract {
  id: string
  gigTitle: string
  amount: number
  organizer: string
  participant: string
  status: 'pending' | 'funded' | 'completed' | 'disputed' | 'released'
  createdAt: string
  releaseCondition: string
}

export function EscrowModule() {
  const [contracts, setContracts] = useState<EscrowContract[]>([
    {
      id: '1',
      gigTitle: 'Web3 Developer Meetup',
      amount: 100,
      organizer: '0x1234...5678',
      participant: '0x9876...5432',
      status: 'funded',
      createdAt: '2024-01-10',
      releaseCondition: 'Event completion + 24h'
    },
    {
      id: '2',
      gigTitle: 'DeFi Workshop',
      amount: 150,
      organizer: '0x9876...5432',
      participant: '0x1111...2222',
      status: 'pending',
      createdAt: '2024-01-12',
      releaseCondition: 'Event completion + NFT mint'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newContract, setNewContract] = useState({
    gigTitle: '',
    amount: '',
    participant: '',
    releaseCondition: ''
  })

  const handleCreateContract = () => {
    const contract: EscrowContract = {
      id: Date.now().toString(),
      gigTitle: newContract.gigTitle,
      amount: parseFloat(newContract.amount),
      organizer: '0xYour...Address',
      participant: newContract.participant,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      releaseCondition: newContract.releaseCondition
    }

    setContracts([...contracts, contract])
    setNewContract({
      gigTitle: '',
      amount: '',
      participant: '',
      releaseCondition: ''
    })
    setShowCreateForm(false)
  }

  const handleStatusChange = (id: string, newStatus: EscrowContract['status']) => {
    setContracts(contracts.map(contract => 
      contract.id === id ? { ...contract, status: newStatus } : contract
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'funded': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'disputed': return 'bg-red-500'
      case 'released': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'funded': return <Shield className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'disputed': return <XCircle className="h-4 w-4" />
      case 'released': return <Coins className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Escrow Contracts</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Escrow'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Escrow Contract</CardTitle>
            <CardDescription>Set up a secure payment escrow for your gig</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gigTitle">Gig Title</Label>
                <Input
                  id="gigTitle"
                  value={newContract.gigTitle}
                  onChange={(e) => setNewContract({...newContract, gigTitle: e.target.value})}
                  placeholder="Enter gig title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (SUI)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newContract.amount}
                  onChange={(e) => setNewContract({...newContract, amount: e.target.value})}
                  placeholder="100"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="participant">Participant Address</Label>
              <Input
                id="participant"
                value={newContract.participant}
                onChange={(e) => setNewContract({...newContract, participant: e.target.value})}
                placeholder="0x..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseCondition">Release Condition</Label>
              <Input
                id="releaseCondition"
                value={newContract.releaseCondition}
                onChange={(e) => setNewContract({...newContract, releaseCondition: e.target.value})}
                placeholder="e.g., Event completion + 24h"
              />
            </div>

            <Button onClick={handleCreateContract} className="w-full">
              Create Escrow Contract
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {contracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{contract.gigTitle}</CardTitle>
                <Badge className={`${getStatusColor(contract.status)} text-white`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(contract.status)}
                    {contract.status.toUpperCase()}
                  </div>
                </Badge>
              </div>
              <CardDescription>Contract ID: {contract.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Amount</p>
                  <p className="font-semibold">{contract.amount} SUI</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-semibold">{new Date(contract.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Organizer</p>
                <p className="font-mono text-xs">{contract.organizer}</p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Participant</p>
                <p className="font-mono text-xs">{contract.participant}</p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Release Condition</p>
                <p>{contract.releaseCondition}</p>
              </div>

              <div className="flex gap-2 pt-2">
                {contract.status === 'pending' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusChange(contract.id, 'funded')}
                  >
                    Fund Escrow
                  </Button>
                )}
                {contract.status === 'funded' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(contract.id, 'completed')}
                    >
                      Mark Complete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleStatusChange(contract.id, 'disputed')}
                    >
                      Dispute
                    </Button>
                  </>
                )}
                {contract.status === 'completed' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusChange(contract.id, 'released')}
                  >
                    Release Funds
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
