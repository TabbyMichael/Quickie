"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

// Define form schema
const privacyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  bio: z.string().max(300, "Bio must be at most 300 characters"),
  // Add more fields as needed
})

type PrivacyFormValues = z.infer<typeof privacyFormSchema>

export default function EditProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      name: "Jessica Smith",
      location: "New York, NY",
      bio: "Adventure seeker & coffee enthusiast ☕️",
      // Initialize more fields as needed
    },
  })

  const onSubmit: SubmitHandler<PrivacyFormValues> = (data) => {
    // Handle save logic with validated data
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/path-to-profile-pic.jpg" alt="Profile Picture" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline">
              Change Photo
            </Button>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              className={`mt-1 block w-full ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              className={`mt-1 block w-full ${errors.location ? "border-red-500" : ""}`}
              placeholder="Enter your location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              className={`mt-1 block w-full ${errors.bio ? "border-red-500" : ""}`}
              placeholder="Tell us about yourself"
              rows={4}
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-transform transform hover:scale-105"
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 