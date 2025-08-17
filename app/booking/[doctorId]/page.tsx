"use client"

import { useEffect, useState  } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { Leaf, ArrowLeft, Clock, Monitor, MapPin, Star } from "lucide-react"
import { getAvailableSlots, lockSlot, unlockSlot, confirmSlot } from "@/lib/appointments"
import { getDoctorById } from "@/lib/doctors"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

const CustomDateCalendar = styled(DateCalendar)(({ theme }) => ({
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--primary)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "oklch(0.45 0.12 65)",
    },
  },
  "& .MuiPickersDay-root.Mui-disabled": {
    color: theme.palette.text.disabled,
    backgroundColor: "transparent",
  },
  "& .MuiPickersDay-root:not(.Mui-selected)": {
    borderRadius: "50%", // keep it round
  },
}))

export default function BookingPage() {
  const params = useParams()
  const doctorId = params.doctorId as string

  const [doctor, setDoctor] = useState<any>(null) // fetch doctor details later
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableSlots, setAvailableSlots] = useState<any[]>([])
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [selectedMode, setSelectedMode] = useState<string>("online");


  const [step, setStep] = useState<"select" | "confirm" | "otp" | "success">("select")
  const [otp, setOtp] = useState("")
  const [isSlotLocked, setIsSlotLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)


  useEffect(() => {
  const fetchDoctor = async () => {
    try {
      const res = await getDoctorById(doctorId)
      if (res.success) {
        setDoctor(res.result)
      }
    } catch (err) {
      console.error("Error fetching doctor", err)
    } finally {
      setLoading(false)
    }
  }

  if (doctorId) fetchDoctor()
}, [doctorId])

  // 🔹 Fetch slots when date changes
  useEffect(() => {
  if (!selectedDate) return;
  
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  (async () => {
    try {
      const res = await getAvailableSlots(
        doctorId,
        formattedDate
      )
      setAvailableSlots(res.result || [])
    } catch (err) {
      console.error("Error fetching slots", err)
    }
  })()
}, [selectedDate, doctorId])


  // 🔹 Lock slot
  const handleBookingConfirm = async () => {
  if (!selectedSlot || !selectedMode || !selectedDate) return;

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  try {
    const res = await lockSlot({
      doctorId,
      date: formattedDate,
      start: selectedSlot.start,
      end: selectedSlot.end,
      mode: selectedMode,
    });
    console.log("Lock slot response:", res)

    if (res.success) {
      setStep("confirm")
      setIsSlotLocked(true)
      setLockTimer(300)

      // countdown
      const timer = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsSlotLocked(false)
            unlockSlot(selectedSlot._id) // release slot if expired
            setStep("select")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  } catch (err) {
    console.error("Lock slot failed", err)
  }
}

  // 🔹 Confirm after OTP
  const handleOtpSubmit = async () => {
    if (!selectedDate) return; 
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    try {
      const res = await confirmSlot(
        doctorId,
        formattedDate,
        selectedSlot,
        selectedMode
      );
      if (res.success) {
        setStep("success")
      }
    } catch (err) {
      console.error("Booking confirm failed", err)
    }
  }

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) return <div>Loading...</div>
  if (!doctor) return <div>Doctor not found</div>

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
              <p className="text-muted-foreground">
                Select your preferred date and time
              </p>
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
                        <p className="text-muted-foreground">
                          {doctor.doctorApplication?.bio || "No bio available"}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        {doctor.modes.includes("online") && (
                          <div className="flex items-center justify-center gap-1">
                            <Monitor className="h-4 w-4 text-primary" />
                            <span>Online</span>
                          </div>
                        )}
                        {doctor.modes.includes("in-person") && (
                          <div className="flex items-center justify-center gap-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>In-person</span>
                          </div>
                        )}
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {doctor.specialization &&
                          doctor.specialization.length > 0 ? (
                            doctor.specialization.map(
                              (spec: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs">
                                  {spec}
                                </Badge>
                              )
                            )
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Experienced Doctor
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-lg font-semibold">₹{500}</p>
                        <p className="text-sm text-muted-foreground">
                          Consultation Fee
                        </p>
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <CustomDateCalendar
                        value={selectedDate}
                        onChange={(newDate: Date | null) =>
                          setSelectedDate(newDate)
                        }
                        disablePast
                        shouldDisableDate={date => {
                          if (!doctor?.availability) return true;
                          const dayMap: Record<string, number> = {
                            Sun: 0,
                            Mon: 1,
                            Tue: 2,
                            Wed: 3,
                            Thu: 4,
                            Fri: 5,
                            Sat: 6,
                          };
                          const allowedDays = doctor.availability.map(
                            (av: any) => dayMap[av.day]
                          );
                          return !allowedDays.includes(date.getDay());
                        }}
                      />
                    </LocalizationProvider>
                  </CardContent>
                </Card>

                {selectedDate && availableSlots.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">
                        Available Time Slots
                      </h3>
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
                        {availableSlots.map((slot, idx) => (
                          <Button
                            key={`${slot.start}-${slot.end}-${idx}`}
                            variant={
                              selectedSlot === slot ? "default" : "outline"
                            }
                            onClick={() => setSelectedSlot(slot)}
                            className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {slot.start} - {slot.end}
                          </Button>
                        ))}

                        {/* Mode Selection */}
                        {doctor.modes && doctor.modes.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Select Mode</p>
                            <div className="flex gap-3 flex-wrap">
                              {doctor.modes.map(
                                (mode: string, index: number) => (
                                  <Button
                                    key={index}
                                    variant={
                                      selectedMode === mode
                                        ? "default"
                                        : "outline"
                                    }
                                    onClick={() => setSelectedMode(mode)}>
                                    {mode === "online" ? "Online" : "In-person"}
                                  </Button>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedDate && selectedSlot && selectedMode && (
                  <div className="flex justify-end">
                    <Button
                      onClick={handleBookingConfirm}
                      size="lg"
                      className="px-8">
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
                    This slot will be locked for{" "}
                    <span className="font-bold">{formatTimer(lockTimer)}</span>
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
                  <p className="text-muted-foreground">
                    {doctor.specialization.join(", ") || "General Practitioner"}
                  </p>
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
                  <span className="font-medium">
                    {selectedSlot.start} - {selectedSlot.end}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode:</span>
                  <span className="font-medium">
                    {selectedMode === "online" ? "Online" : "In-person"}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Total Fee:</span>
                  <span className="font-semibold">₹{500}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("select")}
                  className="flex-1">
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
              <p className="text-muted-foreground">
                Enter the OTP sent to your phone
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest"
                  maxLength={4}
                />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Demo OTP: 1234
                </p>
              </div>
              <Button
                onClick={handleOtpSubmit}
                className="w-full"
                disabled={otp.length !== 4}>
                Verify & Book
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-muted-foreground">
                  Your appointment has been successfully booked
                </p>
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
                  <span className="font-medium">
                    {selectedSlot.start} - {selectedSlot.end}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-medium">
                    AMR{Date.now().toString().slice(-6)}
                  </span>
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
  );
}
