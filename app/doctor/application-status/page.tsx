"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Clock, CheckCircle, XCircle, FileText, Mail, Phone, Stethoscope, ArrowLeft } from "lucide-react"

// Mock application status data
const mockApplicationStatus = {
  id: 1,
  doctorName: "Dr. Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 9876543210",
  status: "under_review", // pending, under_review, approved, rejected
  submittedAt: "2024-01-15T10:30:00Z",
  reviewedAt: null,
  reviewNotes: "",
  estimatedReviewTime: "2-3 business days",
  documentsVerified: 4,
  totalDocuments: 5,
  nextSteps: [
    { step: "Application Submitted", completed: true, date: "Jan 15, 2024" },
    { step: "Document Verification", completed: true, date: "Jan 16, 2024" },
    { step: "Medical Team Review", completed: false, date: "In Progress" },
    { step: "Final Approval", completed: false, date: "Pending" },
  ],
}

export default function ApplicationStatusPage() {
  const [application, setApplication] = useState(mockApplicationStatus)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate progress based on completed steps
    const completedSteps = application.nextSteps.filter((step) => step.completed).length
    const totalSteps = application.nextSteps.length
    setProgress((completedSteps / totalSteps) * 100)
  }, [application])

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
        return <Clock className="h-5 w-5" />
      case "under_review":
        return <FileText className="h-5 w-5" />
      case "approved":
        return <CheckCircle className="h-5 w-5" />
      case "rejected":
        return <XCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
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
            <Link href="/doctor/login" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Login</span>
            </Link>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Amrutam</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="font-medium">Doctor Portal</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Application Status</h1>
          <p className="text-muted-foreground">Track the progress of your doctor registration application</p>
        </div>

        {/* Status Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(application.status)}
                  Application Status
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Submitted on {formatDate(application.submittedAt)}</p>
              </div>
              <Badge variant={getStatusColor(application.status)} className="text-sm px-3 py-1">
                {application.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Application Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{application.documentsVerified}</div>
                <div className="text-sm text-muted-foreground">Documents Verified</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{application.totalDocuments}</div>
                <div className="text-sm text-muted-foreground">Total Documents</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{application.estimatedReviewTime}</div>
                <div className="text-sm text-muted-foreground">Est. Review Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Review Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : <span>{index + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.step}
                      </span>
                      <span className="text-sm text-muted-foreground">{step.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status-specific Content */}
        {application.status === "pending" && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Application Under Review</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for submitting your application. Our medical team is currently reviewing your credentials
                  and documents.
                </p>
                <p className="text-sm text-muted-foreground">
                  You will receive an email notification once the review is complete.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {application.status === "approved" && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-green-800">Application Approved!</h3>
                <p className="text-green-700 mb-4">
                  Congratulations! Your application has been approved. You can now access your doctor dashboard and
                  start accepting consultations.
                </p>
                <Link href="/doctor/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">Access Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {application.status === "rejected" && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="text-center">
                <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-red-800">Application Not Approved</h3>
                <p className="text-red-700 mb-4">
                  Unfortunately, your application could not be approved at this time. Please review the feedback below
                  and consider reapplying.
                </p>
                {application.reviewNotes && (
                  <div className="bg-white p-4 rounded-lg mb-4 text-left">
                    <h4 className="font-medium mb-2">Review Notes:</h4>
                    <p className="text-sm text-muted-foreground">{application.reviewNotes}</p>
                  </div>
                )}
                <Link href="/doctor/register">
                  <Button variant="outline" className="bg-white">
                    Submit New Application
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">doctors@amrutam.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                If you have any questions about your application status or need to update your information, please
                contact our support team. We typically respond within 24 hours.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
