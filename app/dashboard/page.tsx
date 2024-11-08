"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data - in a real app this would come from your API
const profiles = [
  {
    id: 1,
    name: "Sarah, 25",
    bio: "Adventure seeker & coffee enthusiast ☕️",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    distance: "3 miles away",
  },
  {
    id: 2,
    name: "Michael, 28",
    bio: "Photographer 📸 | Dog lover 🐕",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    distance: "5 miles away",
  },
  // Add more mock profiles as needed
]

export default function DashboardPage() {
  const [currentProfile, setCurrentProfile] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)
    // Add swipe animation
    setTimeout(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length)
      setSwipeDirection(null)
    }, 300)
  }

  const profile = profiles[currentProfile]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <Card className={`relative overflow-hidden transition-transform duration-300 ${
          swipeDirection === "left" ? "-translate-x-full" : 
          swipeDirection === "right" ? "translate-x-full" : ""
        }`}>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="mt-2">{profile.bio}</p>
            <p className="text-sm mt-2 opacity-75">{profile.distance}</p>
          </div>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={() => handleSwipe("left")}
          >
            <X className="h-8 w-8 text-red-500" />
          </Button>
          
          <Button
            size="lg"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  )
} 