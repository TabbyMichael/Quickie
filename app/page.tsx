import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 pt-20">
          <div className="relative">
            <Heart className="w-20 h-20 text-pink-500 animate-pulse" />
            <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2" />
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Find Your Perfect Match
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Join millions of singles who have found love through Quickie. 
            Modern dating made simple and meaningful.
          </p>
          
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            {
              title: "Smart Matching",
              description: "Our AI-powered algorithm finds your perfect match based on interests, values, and compatibility.",
              icon: "✨"
            },
            {
              title: "Safe & Secure",
              description: "Your privacy and security are our top priority. Enjoy peace of mind while dating.",
              icon: "🔒"
            },
            {
              title: "Real Connections",
              description: "Connect with genuine people who share your interests and values.",
              icon: "💝"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-12 mt-32">
          {[
            { number: "2M+", label: "Active Users" },
            { number: "500K", label: "Successful Matches" },
            { number: "4.8★", label: "App Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}