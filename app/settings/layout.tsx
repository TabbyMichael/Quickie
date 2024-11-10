import { ReactNode } from "react"
import Link from "next/link"
import { User, Shield, Bell, Lock } from "lucide-react"

const settingsSections = [
  {
    title: "Account",
    icon: User,
    items: [
      { label: "Edit Profile", href: "/settings/edit-profile" },
      { label: "Change Password", href: "/settings/change-password" },
      { label: "Email Notifications", href: "/settings/email-notifications" },
    ],
  },
  {
    title: "Privacy",
    icon: Shield,
    items: [
      { label: "Profile Visibility", href: "/settings/privacy" },
      { label: "Blocked Users", href: "/settings/blocked" },
      { label: "Data & Privacy", href: "/settings/data" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Push Notifications", href: "/settings/push-notifications" },
      { label: "Email Preferences", href: "/settings/email-preferences" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Two-Factor Authentication", href: "/settings/2fa" },
      { label: "Active Sessions", href: "/settings/sessions" },
    ],
  },
]

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-100 dark:bg-gray-900 p-4">
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <section.icon className="w-5 h-5" />
              {section.title}
            </h2>
            <ul>
              {section.items.map((item) => (
                <li key={item.label} className="mb-2">
                  <Link href={item.href} className="text-gray-700 dark:text-gray-200 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}