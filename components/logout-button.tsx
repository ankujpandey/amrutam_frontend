"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout() // clears backend session/token
    } catch (err) {
      console.error("Logout failed:", err)
    } finally {
      setLoading(false)
      router.push("/login")
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  )
}
