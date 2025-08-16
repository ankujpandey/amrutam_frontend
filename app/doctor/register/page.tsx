"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Stethoscope } from "lucide-react"
import { toast } from "sonner"
import { signup } from "@/lib/auth"
import { z } from "zod"
import { signupSchema } from "@/validation/auth.validation";

type DoctorSignupForm = z.infer<typeof signupSchema>

export default function DoctorRegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorSignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "doctor" },
  })

  const onSubmit = async (data: DoctorSignupForm) => {
    try {
      const { confirmPassword, ...payload } = data
      const res = await signup(payload)

      if (!res.success) {
        toast.error(res.message || "Registration failed")
        return
      }

      toast.success("Doctor registered successfully! Our team will review your application.")
      router.push("/doctor/login")
    } catch (err: any) {
      toast.error(err?.error || err?.message || "Something went wrong")
    }
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
            <h1 className="text-2xl font-bold">Doctor Registration</h1>
            <p className="text-muted-foreground">Create your account to join as a doctor</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="doctor@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="9876543210" {...register("phone")} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter password" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm password" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* hidden role field */}
            <input type="hidden" value="doctor" {...register("role")} />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Already registered? </span>
            <a href="/doctor/login" className="text-primary hover:underline">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}