"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription as CardDesc } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

const emailNotifSchema = z.object({
  promotionalEmails: z.boolean().optional(),
  updates: z.boolean().optional(),
  newsletters: z.boolean().optional(),
})

type EmailNotifFormValues = z.infer<typeof emailNotifSchema>

export default function EmailNotificationsPage() {
  const form = useForm<EmailNotifFormValues>({
    resolver: zodResolver(emailNotifSchema),
    defaultValues: {
      promotionalEmails: true,
      updates: true,
      newsletters: false,
    },
  })

  const onSubmit = (data: EmailNotifFormValues) => {
    // Handle form submission, e.g., update user settings via API
    toast({
      title: "Settings Updated",
      description: "Your email notification preferences have been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Email Notifications</CardTitle>
        <CardDesc className="text-sm">
          Manage your email notification preferences.
        </CardDesc>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="promotionalEmails"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Promotional Emails</FormLabel>
                    <FormDescription>
                      Receive the latest promotions and offers.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch {...field} checked={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="updates"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Account Updates</FormLabel>
                    <FormDescription>
                      Get notified about important account updates.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch {...field} checked={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsletters"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Newsletter Subscriptions</FormLabel>
                    <FormDescription>
                      Stay informed with our monthly newsletters.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch {...field} checked={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Save Preferences
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 