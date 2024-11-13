"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Heart, Star, Zap, Shield, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

type PlanDuration = "3days" | "1week" | "1month"

interface Plan {
  duration: PlanDuration
  price: number
  label: string
  isPopular?: boolean
  features?: string[]
}

const plans: Plan[] = [
  {
    duration: "3days",
    price: 119,
    label: "3 days",
    features: [
      "Unlimited Likes",
      "No Ads",
      "See who likes you",
      "Priority Support"
    ]
  },
  {
    duration: "1week",
    price: 389,
    label: "1 week",
    features: [
      "All 3-day features",
      "Premium Badge",
      "Profile Boost",
      "Read Receipts"
    ]
  },
  {
    duration: "1month",
    price: 729,
    label: "1 month",
    isPopular: true,
    features: [
      "All weekly features",
      "Advanced Filters",
      "Monthly Super Boost",
      "Priority Matches",
      "Exclusive Features"
    ]
  },
]

const features = [
  {
    icon: MessageCircle,
    title: "Chat without ads",
    description: "Enjoy uninterrupted conversations",
  },
  {
    icon: Heart,
    title: "Unlimited Likes",
    description: "Like as many profiles as you want",
  },
  {
    icon: Star,
    title: "Priority Matches",
    description: "Get seen by more people",
  },
  {
    icon: Shield,
    title: "Premium Badge",
    description: "Stand out from the crowd",
  },
  {
    icon: Zap,
    title: "Boost Your Profile",
    description: "Get more visibility",
  },
]

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("1month")
  const { user } = useAuth()
  const router = useRouter()

  const handleSubscribe = async (plan: Plan) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to premium features",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    try {
      // Here you would integrate with your payment provider (e.g., Stripe)
      toast({
        title: "Redirecting to payment...",
        description: `Selected plan: ${plan.label} for ${plan.price} KES`,
      })
      // Redirect to payment provider or handle payment flow
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Upgrade to Premium
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get more matches, unlimited likes, and premium features to enhance your dating experience
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <Card 
            key={plan.duration}
            className={`relative ${
              plan.isPopular 
                ? "border-purple-500 shadow-lg shadow-purple-100 dark:shadow-purple-900/20" 
                : ""
            }`}
          >
            {plan.isPopular && (
              <Badge 
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.label}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-purple-600">{plan.price}</span>
                {" "}KES
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.isPopular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : ""
                }`}
                variant={plan.isPopular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan)}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-purple-100 dark:border-purple-900">
            <CardContent className="p-6">
              <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 