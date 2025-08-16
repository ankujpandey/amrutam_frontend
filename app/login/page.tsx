"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { login } from "@/lib/auth"
import { loginSchema } from "@/validation/auth.validation";
import { useState } from "react"

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login(data)
      if (!res.success) {
        toast.error(res.message || "Login failed")
        return
      }

      const { role } = res.result.user
      if (role === "doctor") {
         toast.error("Please Login from the doctor portal")
         setLoading(false)
         return
      }

      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))

      toast.success("Login successful ✅")

      if (res.user.role === "admin") router.push("/admin")
      // else if (res.user.role === "doctor") router.push("/doctor")
      else router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.response?.data?.message || "Login failed ❌")
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
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
