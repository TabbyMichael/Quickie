"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Heart, X, Loader2, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Firestore } from "firebase/firestore" // Import the Firestore type
import { useSwipeable } from "react-swipeable"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

// Define the Profile type
type Profile = {
  id: string;
  image: string;
  name: string;
  bio: string;
  distance: string;
  age: number;
  interests: string[];
  lastActive?: string; // Optional field
  verified: boolean;
  // Add more required fields as needed
}

// Add a type guard function
function isValidProfile(data: any): data is Profile {
  return (
    typeof data.id === 'string' &&
    typeof data.image === 'string' &&
    typeof data.name === 'string' &&
    typeof data.bio === 'string' &&
    typeof data.distance === 'string' &&
    typeof data.age === 'number' &&
    Array.isArray(data.interests) &&
    data.interests.every((interest: any) => typeof interest === 'string') &&
    typeof data.verified === 'boolean' &&
    (!data.lastActive || typeof data.lastActive === 'string') // Optional field check
  );
}

// Update mock profiles data with more diverse profiles
const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Sarah Anderson",
    age: 24,
    bio: "Adventure seeker & coffee enthusiast ☕️\nLove traveling and trying new restaurants 🌎",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    distance: "3 miles away",
    interests: ["Travel", "Photography", "Coffee", "Hiking"],
    verified: true,
    lastActive: "Just now"
  },
  {
    id: "2",
    name: "Emily Parker",
    age: 26,
    bio: "Art lover 🎨 | Yoga enthusiast 🧘‍♀️\nLooking for someone to explore galleries with",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
    distance: "5 miles away",
    interests: ["Art", "Yoga", "Music", "Reading"],
    verified: true,
    lastActive: "2 hours ago"
  },
  {
    id: "3",
    name: "Jessica Chen",
    age: 25,
    bio: "Foodie 🍜 | Dog lover 🐕\nLet's go on a culinary adventure!",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60",
    distance: "1 mile away",
    interests: ["Cooking", "Dogs", "Travel", "Food"],
    verified: false,
    lastActive: "1 hour ago"
  },
  {
    id: "4",
    name: "Alex Rivera",
    age: 28,
    bio: "Music producer 🎵 | Festival enthusiast 🎪\nLooking for someone to share adventures with",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60",
    distance: "2 miles away",
    interests: ["Music", "Festivals", "Travel", "Photography"],
    verified: true,
    lastActive: "3 hours ago"
  },
  {
    id: "5",
    name: "Sophie Williams",
    age: 23,
    bio: "Bookworm 📚 | Tea lover 🫖\nAlways looking for new stories and adventures",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&auto=format&fit=crop&q=60",
    distance: "6 miles away",
    interests: ["Reading", "Writing", "Art", "Coffee"],
    verified: true,
    lastActive: "30 minutes ago"
  },
  {
    id: "6",
    name: "David Kim",
    age: 27,
    bio: "Tech enthusiast 💻 | Amateur chef 👨‍🍳\nLet's cook something amazing together!",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=60",
    distance: "4 miles away",
    interests: ["Cooking", "Technology", "Gaming", "Movies"],
    verified: true,
    lastActive: "5 hours ago"
  },
  {
    id: "7",
    name: "Olivia Martinez",
    age: 25,
    bio: "Dance instructor 💃 | Fitness enthusiast 🏋️‍♀️\nLife is better when you're dancing!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
    distance: "7 miles away",
    interests: ["Dancing", "Fitness", "Music", "Health"],
    verified: true,
    lastActive: "1 hour ago"
  },
  {
    id: "8",
    name: "James Wilson",
    age: 29,
    bio: "Photographer 📸 | Nature lover 🌲\nLet's capture beautiful moments together",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
    distance: "8 miles away",
    interests: ["Photography", "Hiking", "Travel", "Art"],
    verified: false,
    lastActive: "4 hours ago"
  },
  {
    id: "9",
    name: "Emma Thompson",
    age: 24,
    bio: "Artist 🎨 | Plant mom 🌿\nLooking for someone to visit galleries and garden with",
    image: "https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?w=800&auto=format&fit=crop&q=60",
    distance: "5 miles away",
    interests: ["Art", "Plants", "Photography", "Nature"],
    verified: true,
    lastActive: "2 hours ago"
  },
  {
    id: "10",
    name: "Lucas Garcia",
    age: 26,
    bio: "Musician 🎸 | Coffee addict ☕\nLet's make beautiful music together",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    distance: "3 miles away",
    interests: ["Music", "Coffee", "Guitar", "Concerts"],
    verified: true,
    lastActive: "Just now"
  }
];

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentProfile, setCurrentProfile] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [swipeProgress, setSwipeProgress] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null)

  // Define a fallback image URL
  const fallbackImage = "/default-profile.jpg" // Ensure this image exists in your public folder

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    onSwiping: (event) => {
      const progress = event.deltaX / (cardRef.current?.offsetWidth || 400)
      setSwipeProgress(Math.max(-1, Math.min(1, progress)))
      setIsDragging(true)
    },
    onSwiped: () => {
      setSwipeProgress(0)
      setIsDragging(false)
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 10,
  })

  const handleSwipe = async (direction: "left" | "right") => {
    if (exitDirection) return // Prevent multiple swipes while animating

    // Trigger haptic feedback if available
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50)
    }

    setExitDirection(direction)
    
    try {
      if (direction === "right") {
        // Show success toast for matches
        toast({
          title: "It's a match! 💖",
          description: `You liked ${profiles[currentProfile].name}`,
          duration: 3000,
        })
      }
      
      // Wait for animation to complete before changing profile
      setTimeout(() => {
        setCurrentProfile((prev) => {
          const nextIndex = prev + 1
          if (nextIndex >= profiles.length) {
            toast({
              title: "No more profiles",
              description: "Check back later for more matches!",
              duration: 3000,
            })
            return prev
          }
          return nextIndex
        })
        setExitDirection(null)
      }, 300)
    } catch (error) {
      console.error("Error handling swipe:", error)
      setExitDirection(null)
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Add a type guard helper function
  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Initialize profiles with mock data immediately
  useEffect(() => {
    setProfiles(mockProfiles);

    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profilesData = querySnapshot.docs
          .map(doc => {
            try {
              const data = {
                id: doc.id,
                ...doc.data() as Omit<Profile, 'id'>
              };
              
              if (!isValidProfile(data)) {
                console.warn(`Invalid profile data for document ${doc.id}:`, data);
                return null;
              }
              
              return data;
            } catch (err) {
              console.error(`Error processing document ${doc.id}:`, err);
              return null;
            }
          })
          .filter((profile): profile is Profile => profile !== null);

        // Only update profiles if we got valid data from Firebase
        if (profilesData.length > 0) {
          setProfiles(profilesData);
        }
      } catch (err) {
        console.error("Error fetching profiles:", err);
        // Keep using mock profiles if there's an error
        if (profiles.length === 0) {
          setProfiles(mockProfiles);
        }
      }
    };

    fetchProfiles();
  }, [profiles.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        <p className="mt-4 text-gray-500">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-4">
        <div className="text-red-500 mb-2">Error loading profiles</div>
        <p className="text-sm text-gray-500">{error.message}</p>
        <Button 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!user) return null
  if (!profiles.length) return <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">No profiles available</div>

  const profile = profiles[currentProfile]
  if (!profile) return <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">No more profiles to show</div>

  if (!profile?.image) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">Invalid profile data</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <div {...handlers} className="touch-none" ref={cardRef}>
          <Card 
            className={`relative overflow-hidden transition-all duration-300 ease-out transform-gpu ${
              exitDirection === "left" 
                ? "-translate-x-[150%] rotate-[-30deg] opacity-0" 
                : exitDirection === "right" 
                ? "translate-x-[150%] rotate-[30deg] opacity-0" 
                : ""
            } ${isDragging ? "transition-none" : ""}`}
            style={{
              transform: exitDirection 
                ? undefined 
                : `translateX(${swipeProgress * 100}px) rotate(${swipeProgress * 30}deg)`,
              transition: isDragging ? 'none' : 'all 0.3s ease-out',
            }}
          >
            {/* Enhanced Like indicator */}
            <div 
              className={`absolute right-4 top-4 rounded-full bg-green-500 p-2 transition-all duration-200 ${
                swipeProgress > 0.5 ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
              }`}
            >
              <Heart className="h-8 w-8 text-white" />
            </div>
            
            {/* Enhanced Nope indicator */}
            <div 
              className={`absolute left-4 top-4 rounded-full bg-red-500 p-2 transition-all duration-200 ${
                swipeProgress < -0.5 ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
              }`}
            >
              <X className="h-8 w-8 text-white" />
            </div>

            {/* Next profile preview */}
            {profiles[currentProfile + 1] && (
              <div className="absolute inset-0 -z-10">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={profiles[currentProfile + 1].image || fallbackImage}
                    alt={`Preview of ${profiles[currentProfile + 1].name}'s profile`}
                    fill
                    className="object-cover"
                    priority={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = fallbackImage;
                    }}
                  />
                </div>
              </div>
            )}

            {/* Current profile */}
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={profile?.image || fallbackImage}
                alt={profile?.name || "Profile"}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
            </div>
            
            {/* Profile info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
              {/* Premium badge/button */}
              <Link 
                href="/premium" 
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-700 transition-all"
              >
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">Go Premium</span>
              </Link>

              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <span className="text-xl">{profile.age}</span>
                {profile.verified && (
                  <span className="text-blue-400">✓</span>
                )}
              </div>
              <p className="mt-2">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white/20 px-2 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm opacity-75">
                <span>{profile.distance}</span>
                {profile.lastActive && (
                  <span>Active {profile.lastActive}</span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors duration-200"
            onClick={() => handleSwipe("left")}
            disabled={exitDirection !== null}
          >
            <X className={`h-8 w-8 text-red-500 ${exitDirection ? 'opacity-50' : ''}`} />
          </Button>
          
          <Button
            size="lg"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            onClick={() => handleSwipe("right")}
            disabled={exitDirection !== null}
          >
            <Heart className={`h-8 w-8 ${exitDirection ? 'opacity-50' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  )
} 