'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Shield, Clock, CheckCircle, XCircle, Coins, User, MessageSquare, AlertTriangle, Eye, FileCheck } from 'lucide-react'

interface EscrowContract {
  id: string
  gigTitle: string
  amount: number
  organizer: string
  organizerName: string
  participant: string
  participantName: string
  status: 'pending' | 'funded' | 'in_progress' | 'work_submitted' | 'under_review' | 'completed' | 'disputed' | 'released'
  createdAt: string
  releaseCondition: string
  workSubmittedAt?: string
  reviewDeadline?: string
  submissionNotes?: string
  reviewNotes?: string
  disputeReason?: string
  milestones?: Milestone[]
  currentMilestone?: number
}

interface Milestone {
  id: string
  title: string
  description: string
  amount: number
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'disputed'
  dueDate: string
}

export function EscrowModule() {
  const [contracts, setContracts] = useState<EscrowContract[]>([
    {
      id: '1',
      gigTitle: 'Smart Contract Development for DeFi Protocol',
      amount: 1200,
      organizer: '0x1234...5678',
      organizerName: 'BlockTech Solutions',
      participant: '0x080779...abcdef', // Mike's address
      participantName: 'Mike Mentzer',
      status: 'work_submitted',
      createdAt: '2024-01-10',
      releaseCondition: 'Smart contract deployment + security audit',
      workSubmittedAt: '2024-02-12T14:30:00Z',
      reviewDeadline: '2024-02-15T23:59:59Z',
      submissionNotes: 'Smart contract deployed on testnet. All tests passing. Security audit completed by CertiK. Ready for mainnet deployment.',
      milestones: [
        {
          id: '1',
          title: 'Contract Architecture',
          description: 'Design and plan smart contract structure',
          amount: 300,
          status: 'approved',
          dueDate: '2024-01-15'
        },
        {
          id: '2',
          title: 'Core Implementation',
          description: 'Implement main contract functionality',
          amount: 600,
          status: 'approved',
          dueDate: '2024-01-25'
        },
        {
          id: '3',
          title: 'Testing & Deployment',
          description: 'Complete testing and deploy to mainnet',
          amount: 300,
          status: 'submitted',
          dueDate: '2024-02-10'
        }
      ],
      currentMilestone: 2
    },
    {
      id: '2',
      gigTitle: 'React Frontend Development',
      amount: 800,
      organizer: '0x9876...5432',
      organizerName: 'StartupXYZ',
      participant: '0x1111...2222',
      participantName: 'Sarah Chen',
      status: 'in_progress',
      createdAt: '2024-01-12',
      releaseCondition: 'Frontend completion + responsive design',
      milestones: [
        {
          id: '1',
          title: 'UI Components',
          description: 'Build reusable React components',
          amount: 400,
          status: 'in_progress',
          dueDate: '2024-02-18'
        },
        {
          id: '2',
          title: 'Integration & Testing',
          description: 'API integration and testing',
          amount: 400,
          status: 'pending',
          dueDate: '2024-02-25'
        }
      ],
      currentMilestone: 0
    },
    {
      id: '3',
      gigTitle: 'Python Data Analysis Dashboard',
      amount: 600,
      organizer: '0x3333...4444',
      organizerName: 'DataCorp Analytics',
      participant: '0x5555...6666',
      participantName: 'Alex Wong',
      status: 'under_review',
      createdAt: '2024-01-08',
      releaseCondition: 'Data dashboard + documentation',
      workSubmittedAt: '2024-02-11T16:45:00Z',
      reviewDeadline: '2024-02-14T23:59:59Z',
      submissionNotes: 'Dashboard completed with all requested features. Interactive charts, real-time data updates, and comprehensive documentation included.'
    },
    {
      id: '4',
      gigTitle: 'Mobile App UI Design',
      amount: 450,
      organizer: '0x7777...8888',
      organizerName: 'FinanceApp Co',
      participant: '0x9999...0000',
      participantName: 'Lisa Kumar',
      status: 'disputed',
      createdAt: '2024-01-05',
      releaseCondition: 'UI design + prototype',
      workSubmittedAt: '2024-02-08T10:20:00Z',
      disputeReason: 'Design does not match the agreed specifications for the onboarding flow.',
      submissionNotes: 'Complete UI design with interactive prototype. All screens designed according to brief.',
      reviewNotes: 'The onboarding flow needs revision. Colors and typography need adjustment per brand guidelines.'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedContract, setSelectedContract] = useState<string | null>(null)
  const [submissionNotes, setSubmissionNotes] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')

  const handleStatusChange = (id: string, newStatus: EscrowContract['status'], notes?: string) => {
    setContracts(contracts.map(contract => {
      if (contract.id === id) {
        const updatedContract = { ...contract, status: newStatus }
        
        if (newStatus === 'work_submitted') {
          updatedContract.workSubmittedAt = new Date().toISOString()
          updatedContract.reviewDeadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days
          updatedContract.submissionNotes = notes
        } else if (newStatus === 'under_review') {
          updatedContract.reviewNotes = notes
        } else if (newStatus === 'disputed') {
          updatedContract.disputeReason = notes
        }
        
        return updatedContract
      }
      return contract
    }))
    
    setSelectedContract(null)
    setSubmissionNotes('')
    setReviewNotes('')
  }

  const handleMilestoneUpdate = (contractId: string, milestoneId: string, newStatus: Milestone['status']) => {
    setContracts(contracts.map(contract => {
      if (contract.id === contractId && contract.milestones) {
        const updatedMilestones = contract.milestones.map(milestone =>
          milestone.id === milestoneId ? { ...milestone, status: newStatus } : milestone
        )
        return { ...contract, milestones: updatedMilestones }
      }
      return contract
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'funded': return 'bg-blue-500'
      case 'in_progress': return 'bg-indigo-500'
      case 'work_submitted': return 'bg-orange-500'
      case 'under_review': return 'bg-purple-500'
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
      case 'in_progress': return <User className="h-4 w-4" />
      case 'work_submitted': return <FileCheck className="h-4 w-4" />
      case 'under_review': return <Eye className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'disputed': return <AlertTriangle className="h-4 w-4" />
      case 'released': return <Coins className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Waiting for Funding'
      case 'funded': return 'Funded - Ready to Start'
      case 'in_progress': return 'Work in Progress'
      case 'work_submitted': return 'Work Submitted - Awaiting Review'
      case 'under_review': return 'Under Review by Client'
      case 'completed': return 'Work Approved'
      case 'disputed': return 'Disputed - Needs Resolution'
      case 'released': return 'Funds Released'
      default: return status.toUpperCase()
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-200 text-gray-700'
      case 'in_progress': return 'bg-blue-100 text-blue-700'
      case 'submitted': return 'bg-orange-100 text-orange-700'
      case 'approved': return 'bg-green-100 text-green-700'
      case 'disputed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  const getProgressPercentage = (contract: EscrowContract) => {
    if (!contract.milestones) return 0
    const approvedMilestones = contract.milestones.filter(m => m.status === 'approved').length
    return (approvedMilestones / contract.milestones.length) * 100
  }

  const isUserParticipant = (contract: EscrowContract) => {
    return contract.participant === '0x080779...abcdef' // Mike's address
  }

  const isUserOrganizer = (contract: EscrowContract) => {
    return contract.organizer === '0x080779...abcdef' // If Mike is also an organizer
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Escrow Contracts</h2>
          <p className="text-gray-600">Secure payment system with milestone tracking</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Escrow'}
        </Button>
      </div>

      {/* Contract Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {contracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{contract.gigTitle}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Client: {contract.organizerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Worker: {contract.participantName}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(contract.status)} text-white`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(contract.status)}
                    {getStatusText(contract.status)}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contract Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold text-green-600">{contract.amount} SUI</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-semibold">{new Date(contract.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Progress Bar */}
              {contract.milestones && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage(contract))}%</span>
                  </div>
                  <Progress value={getProgressPercentage(contract)} className="h-2" />
                </div>
              )}

              {/* Milestones */}
              {contract.milestones && (
                <div>
                  <h4 className="font-semibold mb-2">Milestones</h4>
                  <div className="space-y-2">
                    {contract.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{milestone.title}</p>
                          <p className="text-xs text-gray-600">{milestone.amount} SUI • Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getMilestoneStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Submission Details */}
              {contract.workSubmittedAt && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Work Submitted</span>
                    <span className="text-xs text-orange-600">
                      {new Date(contract.workSubmittedAt).toLocaleString()}
                    </span>
                  </div>
                  {contract.submissionNotes && (
                    <p className="text-sm text-orange-700">{contract.submissionNotes}</p>
                  )}
                  {contract.reviewDeadline && (
                    <p className="text-xs text-orange-600 mt-1">
                      Review deadline: {new Date(contract.reviewDeadline).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {/* Review Notes */}
              {contract.reviewNotes && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Review Notes</span>
                  </div>
                  <p className="text-sm text-purple-700">{contract.reviewNotes}</p>
                </div>
              )}

              {/* Dispute Information */}
              {contract.status === 'disputed' && contract.disputeReason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">Dispute Reason</span>
                  </div>
                  <p className="text-sm text-red-700">{contract.disputeReason}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {/* For Participants (Workers) */}
                {isUserParticipant(contract) && (
                  <>
                    {contract.status === 'funded' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(contract.id, 'in_progress')}
                      >
                        Start Work
                      </Button>
                    )}
                    {contract.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedContract(contract.id)}
                      >
                        Submit Work
                      </Button>
                    )}
                    {contract.status === 'work_submitted' && (
                      <Button size="sm" variant="outline" disabled>
                        <Clock className="h-4 w-4 mr-1" />
                        Awaiting Review
                      </Button>
                    )}
                  </>
                )}

                {/* For Organizers (Clients) */}
                {isUserOrganizer(contract) && (
                  <>
                    {contract.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(contract.id, 'funded')}
                      >
                        Fund Escrow
                      </Button>
                    )}
                    {(contract.status === 'work_submitted' || contract.status === 'under_review') && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(contract.id, 'completed')}
                        >
                          Approve & Release
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedContract(contract.id)}
                        >
                          Request Changes
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusChange(contract.id, 'disputed', 'Work does not meet requirements')}
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
                  </>
                )}

                {/* General Actions */}
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Work Submission Modal */}
      {selectedContract && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Submit Work</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="submissionNotes">Submission Notes</Label>
                <Textarea
                  id="submissionNotes"
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Describe what you've completed and any important details..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleStatusChange(selectedContract, 'work_submitted', submissionNotes)}
                  disabled={!submissionNotes.trim()}
                >
                  Submit Work
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedContract(null)
                    setSubmissionNotes('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
