"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Calendar, Clock, Monitor, MapPin, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock appointment data
const mockAppointments = [
  {
    id: "AMR123456",
    doctor: {
      name: "Dr. Aayush Kumar",
      specialization: "Ayurveda",
      image: "/doctor.jpg?height=60&width=60",
    },
    date: "2024-10-15",
    time: "10:00",
    mode: "Online",
    status: "booked",
    fee: 500,
  },
  {
    id: "AMR123457",
    doctor: {
      name: "Dr. Priya Sharma",
      specialization: "Panchakarma",
      image: "/doctor.jpg?height=60&width=60",
    },
    date: "2024-10-18",
    time: "14:30",
    mode: "In-person",
    status: "booked",
    fee: 800,
  },
  {
    id: "AMR123458",
    doctor: {
      name: "Dr. Aayush Kumar",
      specialization: "Ayurveda",
      image: "/doctor.jpg?height=60&width=60",
    },
    date: "2024-09-20",
    time: "10:00",
    mode: "Online",
    status: "completed",
    fee: 500,
  },
  {
    id: "AMR123459",
    doctor: {
      name: "Dr. Rajesh Patel",
      specialization: "Herbal Medicine",
      image: "/doctor.jpg?height=60&width=60",
    },
    date: "2024-09-25",
    time: "16:00",
    mode: "In-person",
    status: "completed",
    fee: 700,
  },
  {
    id: "AMR123460",
    doctor: {
      name: "Dr. Aayush Kumar",
      specialization: "Ayurveda",
      image: "/doctor.jpg?height=60&width=60",
    },
    date: "2024-09-10",
    time: "10:00",
    mode: "Online",
    status: "cancelled",
    fee: 500,
  },
]

type AppointmentStatus = "booked" | "completed" | "cancelled"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming")

  const getFilteredAppointments = (status: "upcoming" | "past" | "cancelled") => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (status) {
      case "upcoming":
        return mockAppointments.filter((apt) => apt.status === "booked" && new Date(apt.date) >= today)
      case "past":
        return mockAppointments.filter(
          (apt) => apt.status === "completed" || (apt.status === "booked" && new Date(apt.date) < today),
        )
      case "cancelled":
        return mockAppointments.filter((apt) => apt.status === "cancelled")
      default:
        return []
    }
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "booked":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">BOOKED</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">COMPLETED</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">CANCELLED</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const AppointmentCard = ({ appointment }: { appointment: (typeof mockAppointments)[0] }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={appointment.doctor.image || "/doctor.jpg"}
              alt={appointment.doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{appointment.doctor.name}</h3>
              <p className="text-muted-foreground">{appointment.doctor.specialization}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  {appointment.mode === "Online" ? (
                    <Monitor className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                  <span>{appointment.mode}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              {getStatusBadge(appointment.status)}
              <p className="text-sm text-muted-foreground mt-1">₹{appointment.fee}</p>
            </div>

            {appointment.status === "booked" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={`/reschedule/${appointment.id}`} className="w-full">
                      Reschedule
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Cancel Appointment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Amrutam</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/doctors">
              <Button variant="outline">Find Doctors</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Logout</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Appointment Dashboard</h1>
            <p className="text-muted-foreground">Manage your consultations and appointments</p>
          </div>
          <Link href="/doctors">
            <Button className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Book New Appointment
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Badge variant="secondary">{getFilteredAppointments("upcoming").length} appointments</Badge>
            </div>
            {getFilteredAppointments("upcoming").length > 0 ? (
              getFilteredAppointments("upcoming").map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-4">You don't have any upcoming appointments scheduled.</p>
                  <Link href="/doctors">
                    <Button>Book Your First Appointment</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Past Appointments</h2>
              <Badge variant="secondary">{getFilteredAppointments("past").length} appointments</Badge>
            </div>
            {getFilteredAppointments("past").length > 0 ? (
              getFilteredAppointments("past").map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past appointments</h3>
                  <p className="text-muted-foreground">Your completed appointments will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cancelled Appointments</h2>
              <Badge variant="secondary">{getFilteredAppointments("cancelled").length} appointments</Badge>
            </div>
            {getFilteredAppointments("cancelled").length > 0 ? (
              getFilteredAppointments("cancelled").map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-xl">✕</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No cancelled appointments</h3>
                  <p className="text-muted-foreground">Your cancelled appointments will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
