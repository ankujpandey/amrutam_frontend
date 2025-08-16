"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Leaf, Upload, X, Stethoscope, FileText, User, GraduationCap } from "lucide-react"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string

  // Professional Information
  specializations: string[]
  experience: string
  qualifications: string[]
  medicalLicense: string
  consultationModes: string[]
  languages: string[]

  // Profile
  bio: string
  profilePhoto: File | null

  // Documents
  documents: File[]

  // Availability
  consultationFee: string
  availableDays: string[]
  preferredTimeSlots: string[]
}

const specializations = [
  "Ayurveda",
  "Panchakarma",
  "Herbal Medicine",
  "Yoga Therapy",
  "Pulse Diagnosis",
  "Detoxification",
  "Nutrition & Diet",
  "Stress Management",
]

const languages = ["English", "Hindi", "Sanskrit", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati"]

const timeSlots = ["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM", "6:00 PM - 9:00 PM"]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function DoctorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    specializations: [],
    experience: "",
    qualifications: [],
    medicalLicense: "",
    consultationModes: [],
    languages: [],
    bio: "",
    profilePhoto: null,
    documents: [],
    consultationFee: "",
    availableDays: [],
    preferredTimeSlots: [],
  })

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addToArray = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    if (!currentArray.includes(value)) {
      updateFormData(field, [...currentArray, value])
    }
  }

  const removeFromArray = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    updateFormData(
      field,
      currentArray.filter((item) => item !== value),
    )
  }

  const handleFileUpload = (files: FileList | null, field: "profilePhoto" | "documents") => {
    if (!files) return

    if (field === "profilePhoto") {
      updateFormData("profilePhoto", files[0])
    } else {
      updateFormData("documents", [...formData.documents, ...Array.from(files)])
    }
  }

  const removeDocument = (index: number) => {
    const newDocs = formData.documents.filter((_, i) => i !== index)
    updateFormData("documents", newDocs)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    router.push("/doctor/application-status")
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl sm:text-2xl font-bold text-primary">Amrutam</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/doctor/login">
              <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Already registered? Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold">Doctor Registration</h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Join our platform to connect with patients seeking Ayurvedic care
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-8 sm:w-16 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>Personal</span>
            <span>Professional</span>
            <span>Documents</span>
            <span>Availability</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && (
                <>
                  <User className="h-5 w-5" /> Personal Information
                </>
              )}
              {currentStep === 2 && (
                <>
                  <GraduationCap className="h-5 w-5" /> Professional Details
                </>
              )}
              {currentStep === 3 && (
                <>
                  <FileText className="h-5 w-5" /> Documents & Profile
                </>
              )}
              {currentStep === 4 && (
                <>
                  <Stethoscope className="h-5 w-5" /> Availability & Fees
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="doctor@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Specializations *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec}
                          checked={formData.specializations.includes(spec)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray("specializations", spec)
                            } else {
                              removeFromArray("specializations", spec)
                            }
                          }}
                        />
                        <Label htmlFor={spec} className="text-sm">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                          {spec}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeFromArray("specializations", spec)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="4-7">4-7 years</SelectItem>
                        <SelectItem value="8-15">8-15 years</SelectItem>
                        <SelectItem value="15+">15+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="medicalLicense">Medical License Number *</Label>
                    <Input
                      id="medicalLicense"
                      value={formData.medicalLicense}
                      onChange={(e) => updateFormData("medicalLicense", e.target.value)}
                      placeholder="Enter license number"
                    />
                  </div>
                </div>

                <div>
                  <Label>Consultation Modes *</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online"
                        checked={formData.consultationModes.includes("online")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArray("consultationModes", "online")
                          } else {
                            removeFromArray("consultationModes", "online")
                          }
                        }}
                      />
                      <Label htmlFor="online">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-person"
                        checked={formData.consultationModes.includes("in-person")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArray("consultationModes", "in-person")
                          } else {
                            removeFromArray("consultationModes", "in-person")
                          }
                        }}
                      />
                      <Label htmlFor="in-person">In-person</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Languages Spoken *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {languages.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={lang}
                          checked={formData.languages.includes(lang)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray("languages", lang)
                            } else {
                              removeFromArray("languages", lang)
                            }
                          }}
                        />
                        <Label htmlFor={lang} className="text-sm">
                          {lang}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents & Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData("bio", e.target.value)}
                    placeholder="Write a brief description about your practice, approach, and expertise..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Profile Photo</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Upload your professional photo</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files, "profilePhoto")}
                        className="max-w-xs mx-auto"
                      />
                      {formData.profilePhoto && (
                        <p className="text-sm text-primary mt-2">Selected: {formData.profilePhoto.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Supporting Documents *</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload medical degree, certificates, and other relevant documents
                  </p>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload documents (PDF, JPG, PNG)</p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files, "documents")}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label>Uploaded Documents:</Label>
                      {formData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{doc.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Availability & Fees */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="consultationFee">Consultation Fee (₹) *</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => updateFormData("consultationFee", e.target.value)}
                    placeholder="500"
                  />
                </div>

                <div>
                  <Label>Available Days *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {days.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={formData.availableDays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray("availableDays", day)
                            } else {
                              removeFromArray("availableDays", day)
                            }
                          }}
                        />
                        <Label htmlFor={day} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Preferred Time Slots *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {timeSlots.map((slot) => (
                      <div key={slot} className="flex items-center space-x-2">
                        <Checkbox
                          id={slot}
                          checked={formData.preferredTimeSlots.includes(slot)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray("preferredTimeSlots", slot)
                            } else {
                              removeFromArray("preferredTimeSlots", slot)
                            }
                          }}
                        />
                        <Label htmlFor={slot} className="text-sm">
                          {slot}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Registration Summary</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>• Your application will be reviewed by our medical team</p>
                    <p>• Verification typically takes 2-3 business days</p>
                    <p>• You'll receive email updates on your application status</p>
                    <p>• Once approved, you can start accepting consultations</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {currentStep < 4 ? (
                  <Button onClick={nextStep}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/doctor/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
