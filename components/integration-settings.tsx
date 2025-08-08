'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Github, Linkedin, Calendar, FileText, CheckCircle, ExternalLink, FolderSyncIcon as Sync, Settings, Shield } from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  connected: boolean
  lastSync?: string
  benefits: string[]
  status: 'connected' | 'disconnected' | 'syncing' | 'error'
}

export function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'github',
      name: 'GitHub',
      description: 'Showcase your coding projects and contributions',
      icon: Github,
      connected: true,
      lastSync: '2024-02-12T10:30:00Z',
      benefits: ['Auto-import repositories', 'Show contribution graph', 'Verify coding skills'],
      status: 'connected'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Import professional experience and network',
      icon: Linkedin,
      connected: false,
      benefits: ['Import work experience', 'Professional networking', 'Skill endorsements'],
      status: 'disconnected'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync events and deadlines with your calendar',
      icon: Calendar,
      connected: true,
      lastSync: '2024-02-12T09:15:00Z',
      benefits: ['Auto-add events', 'Deadline reminders', 'Schedule management'],
      status: 'connected'
    },
    {
      id: 'apu-transcript',
      name: 'APU Academic Records',
      description: 'Verify your academic achievements and CGPA',
      icon: FileText,
      connected: true,
      lastSync: '2024-02-10T14:20:00Z',
      benefits: ['Verified CGPA', 'Course completion proof', 'Academic credentials'],
      status: 'connected'
    }
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    newGigs: true,
    eventReminders: true,
    applicationUpdates: true,
    skillMatches: true,
    weeklyDigest: false
  })

  const handleConnect = (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, connected: true, status: 'syncing' as const }
        : integration
    ))

    // Simulate connection process
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              connected: true, 
              status: 'connected' as const,
              lastSync: new Date().toISOString()
            }
          : integration
      ))
    }, 2000)
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, connected: false, status: 'disconnected' as const, lastSync: undefined }
        : integration
    ))
  }

  const handleSync = (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'syncing' as const }
        : integration
    ))

    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'connected' as const, lastSync: new Date().toISOString() }
          : integration
      ))
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500'
      case 'syncing': return 'bg-blue-500'
      case 'error': return 'bg-red-500'
      case 'disconnected': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected'
      case 'syncing': return 'Syncing...'
      case 'error': return 'Error'
      case 'disconnected': return 'Disconnected'
      default: return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Integrations & Settings
        </h2>
        <p className="text-gray-600">Connect external services to enhance your SuiHub experience</p>
      </div>

      {/* Connected Services */}
      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => {
          const IconComponent = integration.icon
          return (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(integration.status)} text-white`}>
                    {integration.status === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {integration.status === 'syncing' && <Sync className="h-3 w-3 mr-1 animate-spin" />}
                    {getStatusText(integration.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Benefits */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {integration.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Last Sync */}
                {integration.lastSync && (
                  <div className="text-xs text-gray-500">
                    Last synced: {new Date(integration.lastSync).toLocaleString()}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {integration.connected ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSync(integration.id)}
                        disabled={integration.status === 'syncing'}
                      >
                        <Sync className="h-3 w-3 mr-1" />
                        Sync Now
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                      disabled={integration.status === 'syncing'}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newGigs" className="text-sm font-medium">New Gig Matches</Label>
                <p className="text-xs text-gray-500">Get notified when gigs match your skills</p>
              </div>
              <Switch
                id="newGigs"
                checked={notificationSettings.newGigs}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, newGigs: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="eventReminders" className="text-sm font-medium">Event Reminders</Label>
                <p className="text-xs text-gray-500">Reminders for registered events</p>
              </div>
              <Switch
                id="eventReminders"
                checked={notificationSettings.eventReminders}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, eventReminders: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="applicationUpdates" className="text-sm font-medium">Application Updates</Label>
                <p className="text-xs text-gray-500">Status changes on your gig applications</p>
              </div>
              <Switch
                id="applicationUpdates"
                checked={notificationSettings.applicationUpdates}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, applicationUpdates: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="skillMatches" className="text-sm font-medium">Skill-Based Recommendations</Label>
                <p className="text-xs text-gray-500">AI-powered gig and event suggestions</p>
              </div>
              <Switch
                id="skillMatches"
                checked={notificationSettings.skillMatches}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, skillMatches: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weeklyDigest" className="text-sm font-medium">Weekly Digest</Label>
                <p className="text-xs text-gray-500">Summary of opportunities and activities</p>
              </div>
              <Switch
                id="weeklyDigest"
                checked={notificationSettings.weeklyDigest}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, weeklyDigest: checked})
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys & Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Configure advanced integration options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
            <Input
              id="webhookUrl"
              placeholder="https://your-app.com/webhook"
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Receive real-time notifications at your custom endpoint
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Personal API Key</Label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                value="sk-suihub-••••••••••••••••"
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="outline" size="sm">
                Regenerate
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Use this key to access SuiHub API from external applications
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
