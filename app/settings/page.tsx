"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Bell, 
  Shield, 
  User, 
  Lock, 
  Moon, 
  Sun, 
  LogOut, 
  Trash2,
  ChevronRight,
  Crown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const settingsSections = [
  {
    title: "Account",
    icon: User,
    items: [
      {
        label: "Edit Profile",
        href: "/settings/profile",
      },
      {
        label: "Change Password",
        href: "/settings/password",
      },
      {
        label: "Email Notifications",
        href: "/settings/notifications",
      },
    ],
  },
  {
    title: "Privacy",
    icon: Shield,
    items: [
      {
        label: "Profile Visibility",
        href: "/settings/privacy",
      },
      {
        label: "Blocked Users",
        href: "/settings/blocked",
      },
      {
        label: "Data & Privacy",
        href: "/settings/data",
      },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      {
        label: "Push Notifications",
        href: "/settings/push-notifications",
      },
      {
        label: "Email Preferences",
        href: "/settings/email-preferences",
      },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      {
        label: "Two-Factor Authentication",
        href: "/settings/2fa",
      },
      {
        label: "Active Sessions",
        href: "/settings/sessions",
      },
    ],
  },
  {
    title: "Premium",
    icon: Crown,
    items: [
      {
        label: "Upgrade to Premium",
        href: "/premium",
      },
      {
        label: "Premium Features",
        href: "/premium#features",
      },
    ],
  },
]

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleLogout = () => {
    // Handle logout logic
    router.push("/login")
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
            <CardDescription>
              These actions are irreversible. Please proceed with caution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={handleLogout}
            >
              <span className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Log Out
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      // Handle account deletion
                      setDeleteDialogOpen(false)
                    }}
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}