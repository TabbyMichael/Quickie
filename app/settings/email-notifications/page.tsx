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
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Bell } from "lucide-react"

const emailNotifSchema = z.object({
  promotionalEmails: z.boolean(),
  updates: z.boolean(),
  newsletters: z.boolean(),
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
    // Handle form submission
    toast({
      title: "Settings Updated",
      description: "Your email notification preferences have been updated.",
    })
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Email Notifications</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="promotionalEmails"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Promotional Emails</FormLabel>
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
                  <FormLabel>Updates</FormLabel>
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
                  <FormLabel>Newsletters</FormLabel>
                  <FormControl>
                    <Switch {...field} checked={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              Save Preferences
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 