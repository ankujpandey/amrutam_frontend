"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Leaf, CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react"

// Mock doctor data
const doctorInfo = {
  name: "Dr. John Doe",
  specialization: "Ayurveda",
  image: "/doctor.jpg?height=40&width=40",
}

// Mock appointments for today
const todaysAppointments = [
  {
    id: 1,
    patientName: "Jane Smith",
    time: "8:00 AM",
    type: "consultation",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "Rahul Sharma",
    time: "1:00 PM",
    type: "follow-up",
    status: "confirmed",
  },
  {
    id: 3,
    patientName: "Alice Johnson",
    time: "3:00 PM",
    type: "consultation",
    status: "pending",
  },
]

// Mock calendar data with both bookings and availability
const calendarData = {
  currentMonth: "December 2024",
  appointments: {
    "2024-12-15": [
      { type: "booking", patient: "Jane Smith", time: "8:00 AM" },
      { type: "booking", patient: "Rahul Sharma", time: "1:00 PM" },
      { type: "available", time: "3:00 PM" },
      { type: "available", time: "4:00 PM" },
    ],
    "2024-12-16": [
      { type: "booking", patient: "Alice Johnson", time: "10:00 AM" },
      { type: "available", time: "2:00 PM" },
      { type: "available", time: "3:00 PM" },
    ],
    "2024-12-18": [
      { type: "booking", patient: "Bob Wilson", time: "2:00 PM" },
      { type: "booking", patient: "Carol Davis", time: "4:00 PM" },
    ],
    "2024-12-20": [
      { type: "available", time: "9:00 AM" },
      { type: "available", time: "10:00 AM" },
      { type: "available", time: "2:00 PM" },
    ],
  },
}

export default function DoctorDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getDayInfo = (day: number) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const dayData = calendarData.appointments[dateKey] || []

    const bookings = dayData.filter((item) => item.type === "booking")
    const availability = dayData.filter((item) => item.type === "available")

    return {
      hasBookings: bookings.length > 0,
      hasAvailability: availability.length > 0,
      bookingCount: bookings.length,
      availabilityCount: availability.length,
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            <span className="text-2xl font-bold">Amrutam</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={doctorInfo.image || "/doctor.jpg"} alt={doctorInfo.name} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="font-medium">{doctorInfo.name}</p>
              <p className="text-sm opacity-90">{doctorInfo.specialization}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <Link href="/doctor/availability">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Manage Availability
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="inline-flex items-center gap-1">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      Bookings
                    </span>
                    <span className="inline-flex items-center gap-1 ml-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Available
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((day, index) => {
                    if (!day) return <div key={index} className="aspect-square"></div>

                    const dayInfo = getDayInfo(day)
                    const isToday =
                      day === new Date().getDate() &&
                      currentMonth.getMonth() === new Date().getMonth() &&
                      currentMonth.getFullYear() === new Date().getFullYear()

                    return (
                      <div key={index} className="aspect-square">
                        <div
                          className={`
                            w-full h-full flex flex-col items-center justify-center text-sm rounded-lg cursor-pointer relative
                            ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}
                            ${dayInfo.hasBookings || dayInfo.hasAvailability ? "hover:bg-muted" : "hover:bg-muted/50"}
                          `}
                        >
                          <span className="font-medium">{day}</span>
                          <div className="flex gap-1 mt-1">
                            {dayInfo.hasBookings && (
                              <div
                                className="w-2 h-2 bg-primary rounded-full"
                                title={`${dayInfo.bookingCount} bookings`}
                              ></div>
                            )}
                            {dayInfo.hasAvailability && (
                              <div
                                className="w-2 h-2 bg-green-500 rounded-full"
                                title={`${dayInfo.availabilityCount} available slots`}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Today's Appointments</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysAppointments.length > 0 ? (
                  todaysAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary">{appointment.type}</Badge>
                        <Badge variant={appointment.status === "confirmed" ? "default" : "outline"} className="text-xs">
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No appointments today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">This Week</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Appointments</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Upcoming</span>
                  <span className="font-semibold text-blue-600">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Available Slots</span>
                  <span className="font-semibold text-green-500">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-semibold">₹6,400</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
