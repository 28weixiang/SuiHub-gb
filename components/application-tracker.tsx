'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Clock, CheckCircle, XCircle, Eye, MessageSquare } from 'lucide-react'

interface Application {
  id: string
  gigTitle: string
  company: string
  appliedDate: string
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'
  payment: number
  lastUpdate: string
  messages: number
}

export function ApplicationTracker() {
  const [applications] = useState<Application[]>([
    {
      id: '1',
      gigTitle: 'Smart Contract Development',
      company: 'BlockTech Solutions',
      appliedDate: '2024-02-10',
      status: 'interview',
      payment: 800,
      lastUpdate: '2024-02-12',
      messages: 3
    },
    {
      id: '2',
      gigTitle: 'React Frontend Developer',
      company: 'StartupXYZ',
      appliedDate: '2024-02-08',
      status: 'reviewing',
      payment: 45,
      lastUpdate: '2024-02-11',
      messages: 1
    },
    {
      id: '3',
      gigTitle: 'Python Data Analysis',
      company: 'DataCorp Analytics',
      appliedDate: '2024-02-05',
      status: 'accepted',
      payment: 35,
      lastUpdate: '2024-02-09',
      messages: 5
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'reviewing': return 'bg-blue-500'
      case 'interview': return 'bg-purple-500'
      case 'accepted': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'reviewing': return <Eye className="h-4 w-4" />
      case 'interview': return <MessageSquare className="h-4 w-4" />
      case 'accepted': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'pending': return 25
      case 'reviewing': return 50
      case 'interview': return 75
      case 'accepted': return 100
      case 'rejected': return 0
      default: return 0
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Applications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold">{app.gigTitle}</h4>
                <p className="text-sm text-gray-600">{app.company}</p>
                <p className="text-xs text-gray-500">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <Badge className={`${getStatusColor(app.status)} text-white mb-2`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(app.status)}
                    {app.status.toUpperCase()}
                  </div>
                </Badge>
                <p className="text-sm font-semibold">{app.payment} SUI</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Application Progress</span>
                <span>{getProgressValue(app.status)}%</span>
              </div>
              <Progress value={getProgressValue(app.status)} className="h-2" />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Updated: {new Date(app.lastUpdate).toLocaleDateString()}</span>
                {app.messages > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {app.messages} messages
                  </span>
                )}
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
