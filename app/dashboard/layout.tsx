"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, MessageCircle, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Discover",
    href: "/dashboard",
    icon: Heart,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          
          {/* Bottom Navigation Bar */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-around py-3">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center gap-1 text-sm",
                        isActive
                          ? "text-pink-500"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
} 