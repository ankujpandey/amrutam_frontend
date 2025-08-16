"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Leaf, ArrowLeft, Clock, Monitor, MapPin, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock appointment data
const mockAppointments = {
  AMR123456: {
    id: "AMR123456",
    doctor: {
      name: "Dr. Droker",
      specialization: "Ayurveda",
      image: "/doctor.jpg?height=80&width=80",
    },
    currentDate: "2024-10-15",
    currentTime: "10:00",
    mode: "Online",
    fee: 500,
  },
}

// Mock available time slots
const availableSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function ReschedulePage() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.appointmentId as string
  const appointment = mockAppointments[appointmentId as keyof typeof mockAppointments]

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [step, setStep] = useState<"select" | "confirm" | "success">("select")

  if (!appointment) {
    return <div>Appointment not found</div>
  }

  // Check if reschedule is allowed (>24h before appointment)
  const appointmentDateTime = new Date(`${appointment.currentDate}T${appointment.currentTime}`)
  const now = new Date()
  const timeDiff = appointmentDateTime.getTime() - now.getTime()
  const hoursUntilAppointment = timeDiff / (1000 * 3600)
  const canReschedule = hoursUntilAppointment > 24

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleRescheduleConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep("confirm")
    }
  }

  const handleFinalConfirm = () => {
    // TODO: API call to reschedule appointment
    console.log("Rescheduling appointment:", {
      appointmentId,
      newDate: selectedDate,
      newTime: selectedTime,
    })
    setStep("success")
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!canReschedule) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Amrutam</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Cannot Reschedule</h2>
                <p className="text-muted-foreground">
                  Appointments can only be rescheduled more than 24 hours before the scheduled time.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  Your appointment is scheduled for{" "}
                  <span className="font-medium">
                    {new Date(appointment.currentDate).toLocaleDateString()} at {appointment.currentTime}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Time remaining: {Math.round(hoursUntilAppointment)} hours
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="w-full">Back to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Amrutam</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {step === "select" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Reschedule Appointment</h1>
              <p className="text-muted-foreground">Select a new date and time for your appointment</p>
            </div>

            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your current appointment will be cancelled and the slot will be released for other patients.
              </AlertDescription>
            </Alert>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Current Appointment Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Current Appointment</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <img
                        src={appointment.doctor.image || "/doctor.jpg"}
                        alt={appointment.doctor.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover mb-3"
                      />
                      <h4 className="font-semibold">{appointment.doctor.name}</h4>
                      <p className="text-muted-foreground text-sm">{appointment.doctor.specialization}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(appointment.currentDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span>{appointment.currentTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mode:</span>
                        <div className="flex items-center gap-1">
                          {appointment.mode === "Online" ? (
                            <Monitor className="h-3 w-3" />
                          ) : (
                            <MapPin className="h-3 w-3" />
                          )}
                          <span>{appointment.mode}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* New Date and Time Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Select New Date</h3>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {selectedDate && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Available Time Slots</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(selectedDate)}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {availableSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => handleTimeSelect(time)}
                            className="flex items-center gap-1"
                          >
                            <Clock className="h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedDate && selectedTime && (
                  <div className="flex justify-end">
                    <Button onClick={handleRescheduleConfirm} size="lg" className="px-8">
                      Confirm Reschedule
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {step === "confirm" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold">Confirm Reschedule</h2>
              <p className="text-muted-foreground">Please review the changes to your appointment</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Current Appointment */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-red-600">Current Appointment</h3>
                  <div className="p-4 bg-red-50 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{new Date(appointment.currentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{appointment.currentTime}</span>
                    </div>
                  </div>
                </div>

                {/* New Appointment */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-green-600">New Appointment</h3>
                  <div className="p-4 bg-green-50 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={appointment.doctor.image || "/doctor.jpg"}
                    alt={appointment.doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{appointment.doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.doctor.specialization}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Consultation Fee:</span>
                  <span className="font-semibold">₹{appointment.fee}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleFinalConfirm} className="flex-1">
                  Confirm Reschedule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Appointment Rescheduled!</h2>
                <p className="text-muted-foreground">Your appointment has been successfully rescheduled</p>
              </div>

              <div className="bg-muted p-6 rounded-lg text-left space-y-3">
                <h3 className="font-semibold mb-3">Updated Appointment Details</h3>
                <div className="flex justify-between">
                  <span>Doctor:</span>
                  <span className="font-medium">{appointment.doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>New Date:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>New Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Appointment ID:</span>
                  <span className="font-medium">{appointmentId}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Back to Dashboard
                  </Button>
                </Link>
                <Link href="/doctors" className="flex-1">
                  <Button className="w-full">Book Another</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
