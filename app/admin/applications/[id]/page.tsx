"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  ArrowLeft,
  Check,
  X,
  Download,
  Eye,
  User,
  GraduationCap,
  FileText,
  Calendar,
  Shield,
  Phone,
  Mail,
  Clock,
  DollarSign,
} from "lucide-react"

// Mock data for a specific application
const mockApplication = {
  id: 1,
  name: "Dr. Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 9876543210",
  dateOfBirth: "1978-05-15",
  gender: "Male",
  specializations: ["Ayurveda", "Panchakarma"],
  experience: "15 years",
  qualifications: ["BAMS", "MD Ayurveda", "Panchakarma Specialist"],
  medicalLicense: "MH/AYU/2008/12345",
  consultationModes: ["Online", "In-person"],
  languages: ["English", "Hindi", "Sanskrit"],
  bio: "Dr. Rajesh Kumar is a highly experienced Ayurvedic practitioner with over 15 years of clinical experience. He specializes in Panchakarma treatments and has helped thousands of patients achieve optimal health through traditional Ayurvedic methods. He holds an MD in Ayurveda and is certified in Panchakarma therapy.",
  consultationFee: 800,
  availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  preferredTimeSlots: ["9:00 AM - 12:00 PM", "3:00 PM - 6:00 PM"],
  status: "pending",
  submittedAt: "2024-01-15T10:30:00Z",
  documents: [
    { name: "Medical_Degree_Certificate.pdf", size: "2.3 MB", type: "pdf" },
    { name: "Medical_License.pdf", size: "1.8 MB", type: "pdf" },
    { name: "Panchakarma_Certification.pdf", size: "1.5 MB", type: "pdf" },
    { name: "Experience_Certificate.pdf", size: "1.2 MB", type: "pdf" },
    { name: "Profile_Photo.jpg", size: "0.8 MB", type: "image" },
  ],
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [application] = useState(mockApplication)

  const handleApprove = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert("Application approved successfully!")
    setIsLoading(false)
  }

  const handleReject = async () => {
    if (!reviewNotes.trim()) {
      alert("Please provide rejection reason in review notes")
      return
    }
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert("Application rejected successfully!")
    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
            <Link href="/admin/applications" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Applications</span>
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

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{application.name}</h1>
              <p className="text-muted-foreground">Application Review</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {application.status}
              </Badge>
              <span className="text-sm text-muted-foreground">Submitted {formatDate(application.submittedAt)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Full Name</p>
                          <p className="text-sm text-muted-foreground">{application.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{application.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date of Birth</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(application.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Gender</p>
                      <Badge variant="outline">{application.gender}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Professional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm font-medium mb-2">Specializations</p>
                      <div className="flex flex-wrap gap-2">
                        {application.specializations.map((spec) => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Experience</p>
                        <p className="text-sm text-muted-foreground">{application.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Medical License</p>
                        <p className="text-sm text-muted-foreground">{application.medicalLicense}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Qualifications</p>
                      <div className="flex flex-wrap gap-2">
                        {application.qualifications.map((qual) => (
                          <Badge key={qual} variant="outline">
                            {qual}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Consultation Modes</p>
                      <div className="flex gap-2">
                        {application.consultationModes.map((mode) => (
                          <Badge key={mode} variant="secondary">
                            {mode}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {application.languages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Professional Bio</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{application.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Uploaded Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {application.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.size}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Availability & Fees
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Consultation Fee</p>
                        <p className="text-lg font-semibold text-primary">₹{application.consultationFee}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Available Days</p>
                      <div className="flex flex-wrap gap-2">
                        {application.availableDays.map((day) => (
                          <Badge key={day} variant="secondary">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Preferred Time Slots</p>
                      <div className="flex flex-wrap gap-2">
                        {application.preferredTimeSlots.map((slot) => (
                          <Badge key={slot} variant="outline">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reviewNotes">Review Notes</Label>
                  <Textarea
                    id="reviewNotes"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add notes about your review decision..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Button onClick={handleApprove} disabled={isLoading} className="w-full">
                    <Check className="h-4 w-4 mr-2" />
                    {isLoading ? "Processing..." : "Approve Application"}
                  </Button>
                  <Button onClick={handleReject} disabled={isLoading} variant="destructive" className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    {isLoading ? "Processing..." : "Reject Application"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary">{application.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents:</span>
                  <span>{application.documents.length} files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specializations:</span>
                  <span>{application.specializations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span>{application.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consultation Fee:</span>
                  <span>₹{application.consultationFee}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
