"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Leaf, Search, Monitor, MapPin, Calendar } from "lucide-react"
import api from "@/lib/api" // ⬅️ your axios instance with baseURL
import { getDoctors } from "@/lib/doctors" // ⬅️ your function to fetch doctors

interface Doctor {
  _id: string
  name: string
  specialization: string[]
  modes: string[]
  availability?: { day: string; start: string; end: string; slotDuration: number }[]
  doctorApplication?: {
    status: string
    bio?: string
    specialization: string[]
  }
}


export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedMode, setSelectedMode] = useState("all")
  const [sortBy, setSortBy] = useState("rating") // backend supports this
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)


useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true)
      const res = await getDoctors({ specialization: selectedSpecialization, mode: selectedMode, sortBy })
      console.log("Doctors response:", res)
      if (res?.success) {
        setDoctors(res.result)
      } else {
        setDoctors([])
      }
    } catch (err) {
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [selectedSpecialization, selectedMode, sortBy])


  // 🔹 Apply frontend search filter (name match)
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.some((spec: string) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              Amrutam
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Doctor Discovery
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Find and book consultations with certified Ayurvedic doctors
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by doctor name or specialization"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Specialization Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm font-medium">Specialization</span>
              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Ayurvedic Medicine">Ayurveda</SelectItem>
                  <SelectItem value="Panchakarma">Panchakarma</SelectItem>
                  <SelectItem value="Herbal Medicine">
                    Herbal Medicine
                  </SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Yoga Therapy">Yoga Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mode Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm font-medium">Mode</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant={selectedMode === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMode("all")}>
                  All
                </Button>
                <Button
                  variant={selectedMode === "online" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMode("online")}
                  className="flex items-center gap-1">
                  <Monitor className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Online</span>
                </Button>
                <Button
                  variant={selectedMode === "in-person" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMode("in-person")}
                  className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">In-person</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-4 sm:gap-6">
          {filteredDoctors.map(doctor => (
            <Card key={doctor._id} className="overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <img
                      src={"/doctor.jpg"}
                      alt={doctor.name}
                      className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover"
                    />
                    <div className="space-y-2 flex-1">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {doctor.name}
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          {doctor.doctorApplication?.bio || ("No bio available")}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        {doctor.modes.includes("online") && (
                          <div className="flex items-center gap-1">
                            <Monitor className="h-4 w-4 text-primary" />
                            <span>Online</span>
                          </div>
                        )}
                        {doctor.modes.includes("in-person") && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>In-person</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {doctor.specialization &&
                          doctor.specialization.length > 0 ? (
                            doctor.specialization.map((spec, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs">
                                {spec}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Experienced Doctor
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {doctor.availability?.[0]
                          ? `${doctor.availability[0].day} ${doctor.availability[0].start}`
                          : "No slots"}
                      </span>
                    </div>
                    <Link href={`/booking/${doctor._id}`}>
                      <Button className="px-6 sm:px-8 text-sm">Book</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No doctors found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialization("all");
                setSelectedMode("all");
              }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
