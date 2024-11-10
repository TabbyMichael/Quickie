"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription as CardDesc } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

const profileVisibilitySchema = z.object({
  isProfilePublic: z.boolean(),
})

type ProfileVisibilityFormValues = z.infer<typeof profileVisibilitySchema>

export default function ProfileVisibilityPage() {
  const form = useForm<ProfileVisibilityFormValues>({
    resolver: zodResolver(profileVisibilitySchema),
    defaultValues: {
      isProfilePublic: true,
    },
  })

  const onSubmit = (data: ProfileVisibilityFormValues) => {
    // Handle form submission, e.g., update profile visibility via API
    toast({
      title: "Profile Visibility Updated",
      description: data.isProfilePublic
        ? "Your profile is now public."
        : "Your profile is now private.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Visibility</CardTitle>
        <CardDesc className="text-sm">
          Control who can see your profile.
        </CardDesc>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormItem className="flex items-center justify-between">
              <div>
                <FormLabel>Public Profile</FormLabel>
                <FormDescription>
                  Your profile is visible to everyone on Quickie.
                </FormDescription>
              </div>
              <FormControl>
                <Switch {...form.register("isProfilePublic")} checked={form.watch("isProfilePublic")} />
              </FormControl>
            </FormItem>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Save Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 