"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import React from "react"

export default function DataAndPrivacyPage() {
  const [dataSharing, setDataSharing] = useState(true)
  const [adPersonalization, setAdPersonalization] = useState(false)
  const [sendUsageData, setSendUsageData] = useState(true)

  const handleDataPrivacyUpdate = () => {
    // Implement the data privacy update logic
    toast({
      title: "Data & Privacy Updated",
      description: "Your data and privacy settings have been updated.",
    })
  }

  const handleDeleteData = () => {
    // Implement data deletion logic
    toast({
      title: "Data Deleted",
      description: "All your data has been deleted permanently.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Data & Privacy</CardTitle>
        <CardDescription className="text-sm">Manage your data and privacy settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-sharing">Allow Data Sharing</Label>
              <p className="text-sm text-gray-500">Share your data with partners to improve our services.</p>
            </div>
            <Switch
              id="data-sharing"
              checked={dataSharing}
              onCheckedChange={setDataSharing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ad-personalization">Ad Personalization</Label>
              <p className="text-sm text-gray-500">Receive personalized ads based on your interests.</p>
            </div>
            <Switch
              id="ad-personalization"
              checked={adPersonalization}
              onCheckedChange={setAdPersonalization}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="send-usage-data">Send Anonymous Usage Data</Label>
              <p className="text-sm text-gray-500">Help us improve by sending anonymous usage statistics.</p>
            </div>
            <Switch
              id="send-usage-data"
              checked={sendUsageData}
              onCheckedChange={setSendUsageData}
            />
          </div>
          
          <Button
            onClick={handleDataPrivacyUpdate}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Save Changes
          </Button>
        </div>
        
        {/* Delete All Data */}
        <Card className="mt-8 border-red-200 dark:border-red-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-red-500">Delete All Data</CardTitle>
                <CardDescription className="text-red-500">
                  Permanently delete all your data from our servers.
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete Data</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Data Deletion</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    Are you sure you want to delete all your data? This action cannot be undone.
                  </DialogDescription>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteData}
                    >
                      Delete Data
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  )
} 