"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Users, Stethoscope, Shield, ArrowRight } from "lucide-react"

const loginOptions = [
  {
    type: "patient",
    title: "Patient Portal",
    description: "Book consultations and manage your health journey",
    icon: Users,
    href: "/login",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    type: "doctor",
    title: "Doctor Portal",
    description: "Manage your practice and connect with patients",
    icon: Stethoscope,
    href: "/doctor/login",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

export default function CommonLoginPage() {
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
            <Link href="/doctor/register">
              <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Join as Doctor
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="text-xs sm:text-sm px-2 sm:px-4">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Amrutam</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-2">Your gateway to holistic Ayurvedic healthcare</p>
          <p className="text-sm sm:text-base text-muted-foreground">
            Choose your portal to access your personalized dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
          {loginOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <Card
                key={option.type}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full ${option.bgColor} flex items-center justify-center`}
                  >
                    <IconComponent className={`h-8 w-8 ${option.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>

                  <Link href={option.href} className="block">
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {option.type === "patient" && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">New to Amrutam?</p>
                      <Link href="/signup">
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          Create Account
                        </Button>
                      </Link>
                    </div>
                  )}

                  {option.type === "doctor" && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Want to join our platform?</p>
                      <Link href="/doctor/register">
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          Register as Doctor
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Why Choose Amrutam?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Certified Practitioners</h3>
              <p className="text-sm text-muted-foreground">Connect with verified Ayurvedic doctors</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Secure Platform</h3>
              <p className="text-sm text-muted-foreground">Your health data is protected and confidential</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Expert Care</h3>
              <p className="text-sm text-muted-foreground">Personalized treatment plans and consultations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Holistic Approach</h3>
              <p className="text-sm text-muted-foreground">Traditional Ayurvedic wisdom meets modern convenience</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're unsure which portal to use or need assistance, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
