"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Stethoscope } from "lucide-react"

export default function DoctorLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Implement doctor authentication logic
    console.log("Doctor login attempt:", { email, password })

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Mock logic to determine doctor status
      const mockDoctorStatus = "approved" // This would come from API: pending, under_review, approved, rejected

      if (mockDoctorStatus === "approved") {
        router.push("/doctor/dashboard")
      } else {
        router.push("/doctor/application-status")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-center gap-2 py-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">Amrutam</span>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Doctor Login</h1>
            <p className="text-muted-foreground">Access your practice dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right">
              <Link href="/doctor/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Login to Dashboard"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Not registered as a doctor? </span>
            <Link href="/doctor/register" className="text-primary hover:underline">
              Apply now
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/doctor/application-status" className="text-sm text-primary hover:underline">
              Check Application Status
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:underline">
              Patient Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
