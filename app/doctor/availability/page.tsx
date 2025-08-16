"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf, ArrowLeft, Clock, Plus, Trash2 } from "lucide-react"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
}

interface DayAvailability {
  day: string
  enabled: boolean
  timeSlots: TimeSlot[]
}

interface RecurringRule {
  id: string
  name: string
  startDate: string
  endDate: string
  repeatWeekly: boolean
}

export default function SetAvailabilityPage() {
  const [availability, setAvailability] = useState<DayAvailability[]>([
    {
      day: "Monday",
      enabled: true,
      timeSlots: [
        { id: "1", startTime: "09:00", endTime: "12:00" },
        { id: "2", startTime: "13:00", endTime: "17:00" },
      ],
    },
    {
      day: "Tuesday",
      enabled: true,
      timeSlots: [{ id: "3", startTime: "09:00", endTime: "12:00" }],
    },
    {
      day: "Wednesday",
      enabled: false,
      timeSlots: [],
    },
    {
      day: "Thursday",
      enabled: true,
      timeSlots: [
        { id: "4", startTime: "08:00", endTime: "12:00" },
        { id: "5", startTime: "13:00", endTime: "17:00" },
      ],
    },
    {
      day: "Friday",
      enabled: false,
      timeSlots: [],
    },
    {
      day: "Saturday",
      enabled: false,
      timeSlots: [],
    },
    {
      day: "Sunday",
      enabled: false,
      timeSlots: [],
    },
  ])

  const [recurringRules, setRecurringRules] = useState<RecurringRule[]>([
    {
      id: "1",
      name: "Regular Schedule",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      repeatWeekly: true,
    },
  ])

  const [showRecurringOptions, setShowRecurringOptions] = useState(false)

  const toggleDay = (dayIndex: number) => {
    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? { ...day, enabled: !day.enabled, timeSlots: !day.enabled ? [] : day.timeSlots } : day,
      ),
    )
  }

  const addTimeSlot = (dayIndex: number) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: "09:00",
      endTime: "17:00",
    }

    setAvailability((prev) =>
      prev.map((day, index) => (index === dayIndex ? { ...day, timeSlots: [...day.timeSlots, newSlot] } : day)),
    )
  }

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? { ...day, timeSlots: day.timeSlots.filter((slot) => slot.id !== slotId) } : day,
      ),
    )
  }

  const updateTimeSlot = (dayIndex: number, slotId: string, field: "startTime" | "endTime", value: string) => {
    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              timeSlots: day.timeSlots.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)),
            }
          : day,
      ),
    )
  }

  const createRecurringRule = () => {
    const newRule: RecurringRule = {
      id: Date.now().toString(),
      name: "New Schedule",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 90 days from now
      repeatWeekly: true,
    }
    setRecurringRules((prev) => [...prev, newRule])
  }

  const updateRecurringRule = (
    ruleId: string,
    field: "name" | "startDate" | "endDate" | "repeatWeekly",
    value: string | boolean,
  ) => {
    setRecurringRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, [field]: value } : rule)))
  }

  const handleSave = () => {
    // TODO: Save availability to backend
    console.log("Saving availability:", { availability, recurringRules })
    alert("Availability saved successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/doctor/dashboard">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            <span className="text-2xl font-bold">Amrutam</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Set Availability</h1>
          <p className="text-muted-foreground">Configure your weekly schedule and available time slots</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <h2 className="text-xl font-semibold">Recurring Availability Rules</h2>
            <Button variant="outline" size="sm" onClick={() => setShowRecurringOptions(!showRecurringOptions)}>
              {showRecurringOptions ? "Hide" : "Show"} Options
            </Button>
          </CardHeader>
          {showRecurringOptions && (
            <CardContent className="space-y-4">
              {recurringRules.map((rule) => (
                <div key={rule.id} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{rule.name}</h3>
                    <Button variant="ghost" size="sm" onClick={createRecurringRule}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={rule.startDate}
                        onChange={(e) => updateRecurringRule(rule.id, "startDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={rule.endDate}
                        onChange={(e) => updateRecurringRule(rule.id, "endDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox
                      id={`repeat-${rule.id}`}
                      checked={rule.repeatWeekly}
                      onCheckedChange={(checked) => updateRecurringRule(rule.id, "repeatWeekly", checked as boolean)}
                    />
                    <Label htmlFor={`repeat-${rule.id}`}>Repeat weekly</Label>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Weekly Schedule</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {availability.map((dayAvailability, dayIndex) => (
              <div key={dayAvailability.day} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={dayAvailability.day}
                      checked={dayAvailability.enabled}
                      onCheckedChange={() => toggleDay(dayIndex)}
                    />
                    <Label htmlFor={dayAvailability.day} className="text-lg font-medium min-w-[100px]">
                      {dayAvailability.day}
                    </Label>
                  </div>

                  {dayAvailability.enabled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addTimeSlot(dayIndex)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Time Slot
                    </Button>
                  )}
                </div>

                {dayAvailability.enabled && (
                  <div className="ml-6 space-y-3">
                    {dayAvailability.timeSlots.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No time slots configured</p>
                    ) : (
                      dayAvailability.timeSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateTimeSlot(dayIndex, slot.id, "startTime", e.target.value)}
                              className="w-32"
                            />
                            <span className="text-muted-foreground">to</span>
                            <Input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateTimeSlot(dayIndex, slot.id, "endTime", e.target.value)}
                              className="w-32"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(dayIndex, slot.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {dayIndex < availability.length - 1 && <hr className="border-border" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-8">
          <Link href="/doctor/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>Save Availability</Button>
        </div>
      </div>
    </div>
  )
}
