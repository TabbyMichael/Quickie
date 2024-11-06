"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Edit2, Plus, MapPin, Calendar, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock user data
const userData = {
  name: "Jessica Smith",
  age: 25,
  location: "New York, NY",
  bio: "Adventure seeker & coffee enthusiast ☕️\nLove traveling, photography, and trying new restaurants 🌎📸\nLet's create some memories together! ✨",
  images: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
    // Add more images...
  ],
  interests: ["Travel", "Photography", "Cooking", "Hiking", "Art", "Music"],
  instagram: "@jessica.smith",
  joinDate: "January 2024"
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="relative mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={userData.images[0]}
            alt={userData.name}
            fill
            className="rounded-full object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 rounded-full"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{userData.name}, {userData.age}</h1>
          <p className="text-gray-500 flex items-center justify-center gap-2 mt-2">
            <MapPin className="h-4 w-4" />
            {userData.location}
          </p>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setIsEditing(true)}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          Share Profile
        </Button>
      </div>

      {/* Photo Grid */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {userData.images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="aspect-square flex flex-col items-center justify-center"
            >
              <Plus className="h-6 w-6 mb-2" />
              Add Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">About Me</h2>
          <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">
            {userData.bio}
          </p>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {userData.interests.map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Social Media</h2>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
            <Instagram className="h-5 w-5" />
            {userData.instagram}
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
            <Calendar className="h-5 w-5" />
            Joined {userData.joinDate}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={userData.name} />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={userData.bio} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={userData.location} />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" defaultValue={userData.instagram} />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => setIsEditing(false)}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 