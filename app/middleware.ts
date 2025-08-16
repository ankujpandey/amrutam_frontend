// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("token")?.value || null;
  const url = req.nextUrl.clone();

  if (!token) {
    // Redirect unauthenticated users to login
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/booking") ||
      url.pathname.startsWith("/doctor") ||
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/reschedule")
    ) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Decode role from JWT (or read from cookie/localStorage)
  const userRole = req.cookies.get("role")?.value;

  // Protect based on role
  if (url.pathname.startsWith("/admin") && userRole !== "admin") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  if (url.pathname.startsWith("/doctor") && userRole !== "doctor") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  if (
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/booking") ||
      url.pathname.startsWith("/reschedule")) &&
    userRole !== "patient"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run middleware on these routes
export const config = {
  matcher: ["/dashboard/:path*", "/booking/:path*", "/doctor/:path*", "/admin/:path*", "/reschedule/:path*"],
};
