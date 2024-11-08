"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { EyeOff, Lock, Shield } from "lucide-react"

const privacyFormSchema = z.object({
  profileVisibility: z.boolean(),
  onlineStatus: z.boolean(),
  readReceipts: z.boolean(),
  locationSharing: z.boolean(),
})

type PrivacyFormValues = z.infer<typeof privacyFormSchema>

export default function SettingsPrivacyPage() {
  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: true,
      onlineStatus: true,
      readReceipts: true,
      locationSharing: false,
    },
  })

  function onSubmit(data: PrivacyFormValues) {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been updated successfully.",
    })
  }

  const privacySettings = [
    {
      icon: EyeOff,
      title: "Profile Visibility",
      description: "Control who can see your profile",
      name: "profileVisibility" as const,
    },
    {
      icon: Shield,
      title: "Online Status",
      description: "Show when you're active on Quickie",
      name: "onlineStatus" as const,
    },
    {
      icon: Lock,
      title: "Read Receipts",
      description: "Let others know when you've read their messages",
      name: "readReceipts" as const,
    },
    {
      icon: Lock,
      title: "Location Sharing",
      description: "Share your location with matches",
      name: "locationSharing" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Manage your privacy settings and control your data.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            {privacySettings.map(({ icon: Icon, ...setting }) => (
              <Card key={setting.name}>
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name={setting.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <FormLabel>{setting.title}</FormLabel>
                          </div>
                          <FormDescription>{setting.description}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <Button type="submit">Save privacy settings</Button>
        </form>
      </Form>
    </div>
  )
}