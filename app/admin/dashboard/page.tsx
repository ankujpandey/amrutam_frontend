"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, UserCheck, Clock, Shield, LogOut, Bell } from "lucide-react"

// Mock data
const stats = {
  totalDoctors: 156,
  activeDoctors: 142,
  pendingApplications: 8,
  totalConsultations: 2847,
  monthlyGrowth: 12.5,
  recentApplications: [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Ayurveda",
      experience: "15 years",
      submittedAt: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Panchakarma",
      experience: "8 years",
      submittedAt: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialization: "Herbal Medicine",
      experience: "12 years",
      submittedAt: "1 day ago",
      status: "under_review",
    },
  ],
  recentActivity: [
    { action: "Doctor approved", doctor: "Dr. Meera Singh", time: "30 minutes ago" },
    { action: "New application", doctor: "Dr. Rajesh Kumar", time: "2 hours ago" },
    { action: "Document verified", doctor: "Dr. Priya Sharma", time: "4 hours ago" },
    { action: "Doctor rejected", doctor: "Dr. John Doe", time: "6 hours ago" },
  ],
}

export default function AdminDashboardPage() {
  const [notifications] = useState(3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Amrutam</span>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Admin User</span>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Review and approve doctor applications</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                  <p className="text-2xl font-bold">{stats.pendingApplications}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Doctors</p>
                  <p className="text-2xl font-bold">{stats.activeDoctors}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Doctors</p>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold">Doctor Applications</h2>
            <Link href="/admin/applications">
              <Button>View All Applications</Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {stats.recentApplications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{application.name}</h3>
                        <Badge
                          variant={
                            application.status === "pending"
                              ? "secondary"
                              : application.status === "under_review"
                                ? "default"
                                : "outline"
                          }
                        >
                          {application.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>{application.specialization}</span>
                        <span>•</span>
                        <span>{application.experience}</span>
                        <span>•</span>
                        <span>Submitted {application.submittedAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
