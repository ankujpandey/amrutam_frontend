"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Leaf, ArrowLeft, Clock, Monitor, MapPin, Star } from "lucide-react"

// Mock doctor data (in real app, this would come from API)
const mockDoctors = {
  "1": {
    id: 1,
    name: "Dr. Arvind",
    specialization: "Ayurveda",
    mode: "Online",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.8,
    experience: "15 years",
    consultationFee: 500,
  },
  "2": {
    id: 2,
    name: "Dr. Sushila",
    specialization: "Ayurveda",
    mode: "Online",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.9,
    experience: "12 years",
    consultationFee: 600,
  },
  "3": {
    id: 3,
    name: "Dr. Prakash",
    specialization: "Ayurveda",
    mode: "In-person",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.7,
    experience: "20 years",
    consultationFee: 800,
  },
}

// Mock available time slots
const timeSlots = [
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

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const doctorId = params.doctorId as string
  const doctor = mockDoctors[doctorId as keyof typeof mockDoctors]

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [step, setStep] = useState<"select" | "confirm" | "otp" | "success">("select")
  const [otp, setOtp] = useState("")
  const [isSlotLocked, setIsSlotLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookingConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep("confirm")
      setIsSlotLocked(true)
      setLockTimer(300) // 5 minutes in seconds

      // Start countdown timer
      const timer = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsSlotLocked(false)
            setStep("select")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleOtpSubmit = () => {
    if (otp === "1234") {
      // Mock OTP verification
      setStep("success")
    }
  }

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/doctors" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Amrutam</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {step === "select" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
              <p className="text-muted-foreground">Select your preferred date and time</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Doctor Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <img
                        src={doctor.image || "/doctor.jpg"}
                        alt={doctor.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <p className="text-muted-foreground">{doctor.specialization}</p>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          {doctor.mode === "Online" ? (
                            <Monitor className="h-4 w-4 text-primary" />
                          ) : (
                            <MapPin className="h-4 w-4 text-primary" />
                          )}
                          <span>{doctor.mode}</span>
                        </div>
                        <Badge variant="secondary">{doctor.experience}</Badge>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-lg font-semibold">₹{doctor.consultationFee}</p>
                        <p className="text-sm text-muted-foreground">Consultation Fee</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calendar and Time Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Select Date</h3>
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
                      <p className="text-sm text-muted-foreground">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
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
                    <Button onClick={handleBookingConfirm} size="lg" className="px-8">
                      Confirm Booking
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
              <h2 className="text-2xl font-bold">Booking Confirmation</h2>
              {isSlotLocked && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-yellow-800">
                    This slot will be locked for <span className="font-bold">{formatTimer(lockTimer)}</span>
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <img
                  src={doctor.image || "/doctor.jpg"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-muted-foreground">{doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode:</span>
                  <span className="font-medium">{doctor.mode}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Total Fee:</span>
                  <span className="font-semibold">₹{doctor.consultationFee}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep("otp")} className="flex-1">
                  Proceed to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "otp" && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold">Verify OTP</h2>
              <p className="text-muted-foreground">Enter the OTP sent to your phone</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest"
                  maxLength={4}
                />
                <p className="text-sm text-muted-foreground mt-2 text-center">Demo OTP: 1234</p>
              </div>
              <Button onClick={handleOtpSubmit} className="w-full" disabled={otp.length !== 4}>
                Verify & Book
              </Button>
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
                <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground">Your appointment has been successfully booked</p>
              </div>

              <div className="bg-muted p-6 rounded-lg text-left space-y-3">
                <h3 className="font-semibold mb-3">Appointment Details</h3>
                <div className="flex justify-between">
                  <span>Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-medium">AMR{Date.now().toString().slice(-6)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Dashboard
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
