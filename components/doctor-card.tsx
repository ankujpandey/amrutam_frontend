import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, MapPin, Calendar, Star } from "lucide-react"

interface Doctor {
  id: number
  name: string
  specialization: string
  mode: string
  nextAvailable: string
  image: string
  rating: number
  experience: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={doctor.image || "/doctor.jpg"}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/10"
            />
            <div className="space-y-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                <p className="text-muted-foreground">{doctor.specialization}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {doctor.mode === "Online" ? (
                    <Monitor className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-foreground">{doctor.mode}</span>
                </div>
                <Badge variant="secondary">{doctor.experience}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-foreground">{doctor.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right space-y-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next: {doctor.nextAvailable}</span>
            </div>
            <Link href={`/booking/${doctor.id}`}>
              <Button className="px-8 font-medium">Book</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
