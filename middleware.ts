// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null
  const url = req.nextUrl.clone()

  if (!token) {
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/booking") ||
      url.pathname.startsWith("/doctor") ||
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/reschedule")
    ) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  const userRole = req.cookies.get("role")?.value

  if (url.pathname.startsWith("/admin") && userRole !== "admin") {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }
  if (url.pathname.startsWith("/doctor") && userRole !== "doctor") {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }
  if (
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/booking") ||
      url.pathname.startsWith("/reschedule")) &&
    userRole !== "patient"
  ) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/booking/:path*",
    "/doctor/:path*",
    "/admin/:path*",
    "/reschedule/:path*",
  ],
}


