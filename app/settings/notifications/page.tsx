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
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Heart, MessageCircle, Star } from "lucide-react"

const notificationsFormSchema = z.object({
  newMatches: z.boolean(),
  messages: z.boolean(),
  likes: z.boolean(),
  superLikes: z.boolean(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export default function SettingsNotificationsPage() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      newMatches: true,
      messages: true,
      likes: true,
      superLikes: true,
    },
  })

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been updated successfully.",
    })
  }

  const notificationSettings = [
    {
      icon: Heart,
      title: "New Matches",
      description: "Get notified when you match with someone",
      name: "newMatches" as const,
    },
    {
      icon: MessageCircle,
      title: "Messages",
      description: "Receive notifications for new messages",
      name: "messages" as const,
    },
    {
      icon: Bell,
      title: "Likes",
      description: "Get notified when someone likes your profile",
      name: "likes" as const,
    },
    {
      icon: Star,
      title: "Super Likes",
      description: "Receive notifications for Super Likes",
      name: "superLikes" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Choose what notifications you want to receive.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            {notificationSettings.map(({ icon: Icon, ...setting }) => (
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
          <Button type="submit">Save notification preferences</Button>
        </form>
      </Form>
    </div>
  )
}