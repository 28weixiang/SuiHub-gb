'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Filter, X, Search } from 'lucide-react'

interface FilterState {
  paymentRange: [number, number]
  skills: string[]
  location: string[]
  duration: string[]
  difficulty: string[]
  eventType: string[]
}

export function AdvancedFilters({ onFiltersChange }: { onFiltersChange: (filters: FilterState) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    paymentRange: [0, 2000],
    skills: [],
    location: [],
    duration: [],
    difficulty: [],
    eventType: []
  })

  const skillOptions = ['React', 'Solidity', 'Python', 'TypeScript', 'Node.js', 'Figma', 'SQL']
  const locationOptions = ['Remote', 'Kuala Lumpur', 'APU Campus', 'Hybrid']
  const durationOptions = ['1 week', '2-3 weeks', '1 month', '2+ months']
  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced']
  const eventTypeOptions = ['Workshop', 'Hackathon', 'Meetup', 'Competition', 'Seminar']

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    const newFilters = { ...filters, [category]: newValues }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      paymentRange: [0, 2000],
      skills: [],
      location: [],
      duration: [],
      difficulty: [],
      eventType: []
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        Advanced Filters
      </Button>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Payment Range (SUI)</label>
          <Slider
            value={filters.paymentRange}
            onValueChange={(value) => {
              const newFilters = { ...filters, paymentRange: value as [number, number] }
              setFilters(newFilters)
              onFiltersChange(newFilters)
            }}
            max={2000}
            min={0}
            step={50}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{filters.paymentRange[0]} SUI</span>
            <span>{filters.paymentRange[1]} SUI</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="text-sm font-medium mb-2 block">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <Badge
                key={skill}
                variant={filters.skills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilter('skills', skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <div className="flex flex-wrap gap-2">
            {locationOptions.map((location) => (
              <Badge
                key={location}
                variant={filters.location.includes(location) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilter('location', location)}
              >
                {location}
              </Badge>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium mb-2 block">Duration</label>
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((duration) => (
              <Badge
                key={duration}
                variant={filters.duration.includes(duration) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilter('duration', duration)}
              >
                {duration}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
