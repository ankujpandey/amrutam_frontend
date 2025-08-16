"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { toast } from "sonner"
import { login } from "@/lib/auth"
import { z } from "zod"
import { loginSchema } from "@/validation/auth.validation";

type DoctorLoginForm = z.infer<typeof loginSchema>

export default function DoctorLoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorLoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: DoctorLoginForm) => {
    try {
      const res = await login(data)

      if (!res.success) {
        toast.error(res.message || "Login failed")
        return
      }

      const { role, doctorApplication } = res.result.user

      if (role !== "doctor") {
        toast.error("Only doctors can login here")
        return
      }

      if (doctorApplication?.status === "approved") {
        toast.success("Welcome Doctor!")
        router.push("/doctor/dashboard")
      } else {
        toast.info(`Application status: ${doctorApplication?.status || "pending"}`)
        router.push("/doctor/application-status")
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.response?.data?.message || "Something went wrong")
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
          <h1 className="text-2xl font-bold mb-6">Doctor Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Not registered as a doctor? </span>
            <a href="/doctor/register" className="text-primary hover:underline">
              Apply now
            </a>
          </div>

          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-muted-foreground hover:underline">
              Patient Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}