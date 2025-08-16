import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Calendar, Users, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl sm:text-2xl font-bold text-primary">Amrutam</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Find Your Perfect
            <br />
            Ayurvedic Doctor
          </h1>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Connect with certified Ayurvedic practitioners for personalized consultations and holistic healing
            solutions.
          </p>
          <div className="flex justify-center px-4">
            <Link href="/doctors" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="text-base sm:text-lg px-8 sm:px-12 py-4 w-full sm:w-auto"
              >
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose Amrutam?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Users className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Certified Doctors</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Connect with verified Ayurvedic practitioners
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Calendar className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Easy Booking</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Schedule appointments with just a few clicks</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Shield className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Secure Platform</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Your health data is protected and confidential
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Leaf className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Holistic Care</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Traditional Ayurvedic approach to wellness</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
