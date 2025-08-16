"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, X, Bell } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface NotificationSystemProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function NotificationSystem({ notifications, onMarkAsRead, onDismiss }: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Bell className="h-5 w-5 text-blue-600" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-background border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && <p className="text-sm text-muted-foreground">{unreadCount} unread</p>}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-muted/50 ${!notification.read ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDismiss(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-xs h-6"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Email notification templates
export const emailTemplates = {
  doctorApproved: {
    subject: "Welcome to Amrutam - Your Application Has Been Approved!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #164e63; color: white; padding: 20px; text-align: center;">
          <h1>🌿 Amrutam</h1>
          <h2>Congratulations! You're Now Part of Our Team</h2>
        </div>
        
        <div style="padding: 30px;">
          <p>Dear Dr. {{doctorName}},</p>
          
          <p>We're thrilled to inform you that your application to join Amrutam has been <strong>approved</strong>!</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What's Next?</h3>
            <ul>
              <li>Access your doctor dashboard</li>
              <li>Set up your availability schedule</li>
              <li>Start accepting patient consultations</li>
              <li>Complete your profile setup</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboardUrl}}" style="background: #164e63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Access Your Dashboard
            </a>
          </div>
          
          <p>If you have any questions, our support team is here to help at doctors@amrutam.com</p>
          
          <p>Welcome to the Amrutam family!</p>
          
          <p>Best regards,<br>The Amrutam Team</p>
        </div>
      </div>
    `,
  },

  doctorRejected: {
    subject: "Update on Your Amrutam Application",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #164e63; color: white; padding: 20px; text-align: center;">
          <h1>🌿 Amrutam</h1>
          <h2>Application Status Update</h2>
        </div>
        
        <div style="padding: 30px;">
          <p>Dear Dr. {{doctorName}},</p>
          
          <p>Thank you for your interest in joining Amrutam. After careful review of your application, we regret to inform you that we cannot approve your application at this time.</p>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Feedback:</h3>
            <p>{{reviewNotes}}</p>
          </div>
          
          <p>We encourage you to address the feedback provided and reapply in the future. Our platform is always looking for qualified Ayurvedic practitioners.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{reapplyUrl}}" style="background: #164e63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Submit New Application
            </a>
          </div>
          
          <p>If you have any questions about this decision, please contact us at doctors@amrutam.com</p>
          
          <p>Best regards,<br>The Amrutam Team</p>
        </div>
      </div>
    `,
  },
}
