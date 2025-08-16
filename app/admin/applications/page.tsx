"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Search, Filter, Eye, Check, X, Clock, FileText, Shield, ArrowLeft } from "lucide-react"

// Mock data for doctor applications
const mockApplications = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    specializations: ["Ayurveda", "Panchakarma"],
    experience: "15 years",
    status: "pending",
    submittedAt: "2024-01-15T10:30:00Z",
    documents: 5,
    consultationFee: 800,
    languages: ["English", "Hindi", "Sanskrit"],
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    specializations: ["Panchakarma", "Herbal Medicine"],
    experience: "8 years",
    status: "under_review",
    submittedAt: "2024-01-14T15:45:00Z",
    documents: 4,
    consultationFee: 600,
    languages: ["English", "Hindi"],
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 9876543212",
    specializations: ["Herbal Medicine", "Nutrition"],
    experience: "12 years",
    status: "approved",
    submittedAt: "2024-01-13T09:15:00Z",
    documents: 6,
    consultationFee: 750,
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    id: 4,
    name: "Dr. Meera Singh",
    email: "meera.singh@email.com",
    phone: "+91 9876543213",
    specializations: ["Ayurveda", "Yoga Therapy"],
    experience: "20 years",
    status: "rejected",
    submittedAt: "2024-01-12T14:20:00Z",
    documents: 3,
    consultationFee: 900,
    languages: ["English", "Hindi", "Punjabi"],
  },
]

export default function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [applications] = useState(mockApplications)

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "under_review":
        return "default"
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <Eye className="h-4 w-4" />
      case "approved":
        return <Check className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Amrutam</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">Admin Panel</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Doctor Applications</h1>
          <p className="text-muted-foreground">Review and manage doctor registration applications</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-lg font-semibold">{application.name}</h3>
                      <Badge variant={getStatusColor(application.status)} className="flex items-center gap-1">
                        {getStatusIcon(application.status)}
                        {application.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Email:</span> {application.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {application.phone}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {application.experience}
                      </div>
                      <div>
                        <span className="font-medium">Fee:</span> ₹{application.consultationFee}
                      </div>
                      <div>
                        <span className="font-medium">Documents:</span> {application.documents} files
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span> {formatDate(application.submittedAt)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {application.specializations.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium">Languages:</span>
                      {application.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full sm:w-auto lg:w-auto">
                    <Link href={`/admin/applications/${application.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        Review
                      </Button>
                    </Link>

                    {application.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 sm:flex-none">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1 sm:flex-none">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No applications found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No doctor applications have been submitted yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
