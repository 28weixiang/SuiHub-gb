'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: 'workshop' | 'hackathon' | 'meetup' | 'competition'
  status: 'registered' | 'interested' | 'available'
}

export function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'React Workshop',
      date: '2024-02-18',
      time: '14:00',
      location: 'APU Lab 3',
      type: 'workshop',
      status: 'registered'
    },
    {
      id: '2',
      title: 'Blockchain Hackathon',
      date: '2024-02-20',
      time: '09:00',
      location: 'APU Tech Hub',
      type: 'hackathon',
      status: 'registered'
    },
    {
      id: '3',
      title: 'AI Seminar',
      date: '2024-02-22',
      time: '16:00',
      location: 'APU Auditorium',
      type: 'meetup',
      status: 'interested'
    }
  ])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-500'
      case 'hackathon': return 'bg-orange-500'
      case 'meetup': return 'bg-green-500'
      case 'competition': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'border-green-500 bg-green-50'
      case 'interested': return 'border-yellow-500 bg-yellow-50'
      case 'available': return 'border-gray-300 bg-white'
      default: return 'border-gray-300 bg-white'
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = events.filter(event => event.date === dateStr)
      
      days.push(
        <div key={day} className="h-8 flex flex-col items-center justify-center relative">
          <span className="text-sm">{day}</span>
          {dayEvents.length > 0 && (
            <div className="absolute -bottom-1 flex gap-1">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}
                />
              ))}
              {dayEvents.length > 2 && (
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              )}
            </div>
          )}
        </div>
      )
    }

    return days
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[120px] text-center">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="h-8 flex items-center justify-center font-medium text-sm text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className={`p-3 rounded-lg border-2 ${getStatusColor(event.status)}`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{event.title}</h4>
                <Badge className={`${getEventTypeColor(event.type)} text-white text-xs`}>
                  {event.type}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <Badge variant={event.status === 'registered' ? 'default' : 'outline'}>
                  {event.status === 'registered' ? 'Registered' : 'Available'}
                </Badge>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
