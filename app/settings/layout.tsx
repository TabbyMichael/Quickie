import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/sidebar-nav"
import { User, Lock, Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "Settings - Quickie",
  description: "Manage your account settings and preferences",
}

const sidebarNavItems = [
  {
    title: "Edit Profile",
    href: "/settings/edit-profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Change Password",
    href: "/settings/change-password",
    icon: <Lock className="h-5 w-5" />,
  },
  {
    title: "Email Notifications",
    href: "/settings/email-notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Privacy",
    href: "/settings/privacy",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Matching",
    href: "/settings/matching",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}