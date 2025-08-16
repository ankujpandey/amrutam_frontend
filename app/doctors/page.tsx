"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Leaf, Search, Monitor, MapPin, Calendar } from "lucide-react"

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Arvind",
    specialization: "Ayurveda",
    mode: "Online",
    nextAvailable: "27 Aug, 10:30",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.8,
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Sushila",
    specialization: "Ayurveda",
    mode: "Online",
    nextAvailable: "18 Aug, 09:00",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.9,
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Prakash",
    specialization: "Ayurveda",
    mode: "In-person",
    nextAvailable: "25 Aug, 14:00",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.7,
    experience: "20 years",
  },
  {
    id: 4,
    name: "Dr. Meera Sharma",
    specialization: "Panchakarma",
    mode: "Online",
    nextAvailable: "19 Aug, 11:00",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.8,
    experience: "18 years",
  },
  {
    id: 5,
    name: "Dr. Rajesh Kumar",
    specialization: "Herbal Medicine",
    mode: "In-person",
    nextAvailable: "22 Aug, 16:30",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.6,
    experience: "25 years",
  },
  {
    id: 6,
    name: "Dr. Priya Patel",
    specialization: "Ayurveda",
    mode: "Online",
    nextAvailable: "20 Aug, 15:00",
    image: "/doctor.jpg?height=80&width=80",
    rating: 4.9,
    experience: "14 years",
  },
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedMode, setSelectedMode] = useState("all")

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = selectedSpecialization === "all" || doctor.specialization === selectedSpecialization
    const matchesMode = selectedMode === "all" || doctor.mode.toLowerCase() === selectedMode.toLowerCase()

    return matchesSearch && matchesSpecialization && matchesMode
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl sm:text-3xl font-bold text-primary">Amrutam</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Doctor Discovery</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Find and book consultations with certified Ayurvedic doctors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by doctor name or specialization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm font-medium">Specialization</span>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Ayurveda">Ayurveda</SelectItem>
                  <SelectItem value="Panchakarma">Panchakarma</SelectItem>
                  <SelectItem value="Herbal Medicine">Herbal Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm font-medium">Mode</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant={selectedMode === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMode("all")}
                  className="flex-1 sm:flex-none"
                >
                  All
                </Button>
                <Button
                  variant={selectedMode === "online" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMode("online")}
                  className="flex items-center gap-1 flex-1 sm:flex-none"
                >
                  <Monitor className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Online</span>
                </Button>
                <Button
                  variant={selectedMode === "in-person" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMode("in-person")}
                  className="flex items-center gap-1 flex-1 sm:flex-none"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">In-person</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-4 sm:gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <img
                      src={doctor.image || "/doctor.jpg"}
                      alt={doctor.name}
                      className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold">{doctor.name}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{doctor.specialization}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          {doctor.mode === "Online" ? (
                            <Monitor className="h-4 w-4 text-primary" />
                          ) : (
                            <MapPin className="h-4 w-4 text-primary" />
                          )}
                          <span>{doctor.mode}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {doctor.experience}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Next: {doctor.nextAvailable}</span>
                    </div>
                    <Link href={`/booking/${doctor.id}`}>
                      <Button className="px-6 sm:px-8 text-sm">Book</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No doctors found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedSpecialization("all")
                setSelectedMode("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
