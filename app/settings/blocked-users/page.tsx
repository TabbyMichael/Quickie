"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { useTheme } from "next-themes"

interface BlockedUser {
  id: number
  name: string
  email: string
  blockedAt: string
}

export default function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get<BlockedUser[]>("/api/blocked-users")
        setBlockedUsers(response.data)
      } catch (err) {
        setError("Failed to fetch blocked users.")
        toast({
          title: "Error",
          description: "Unable to retrieve blocked users. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlockedUsers()
  }, [])

  const unblockUser = async (userId: number) => {
    try {
      await axios.delete(`/api/blocked-users/${userId}`)
      setBlockedUsers(prev => prev.filter(user => user.id !== userId))
      toast({
        title: "User Unblocked",
        description: "The user has been unblocked successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock the user. Please try again.",
      })
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl dark:text-white">Blocked Users</CardTitle>
          <Button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline" 
            size="sm" 
            type="button"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
        <CardDescription className="text-sm dark:text-gray-300">Manage users you have blocked.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : blockedUsers.length > 0 ? (
          <Table className="bg-white dark:bg-gray-700">
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Name</TableHead>
                <TableHead className="dark:text-gray-300">Email</TableHead>
                <TableHead className="dark:text-gray-300">Blocked At</TableHead>
                <TableHead className="dark:text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedUsers.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <TableCell className="dark:text-gray-200">{user.name}</TableCell>
                  <TableCell className="dark:text-gray-200">{user.email}</TableCell>
                  <TableCell className="dark:text-gray-200">{user.blockedAt}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash className="w-4 h-4 mr-2" />
                          Unblock
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <DialogHeader>
                          <DialogTitle>Unblock {user.name}?</DialogTitle>
                        </DialogHeader>
                        <p className="py-4">
                          Are you sure you want to unblock {user.name}? They will be able to see your profile and contact you again.
                        </p>
                        <DialogFooter>
                          <Button variant="outline">
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              unblockUser(user.id)
                            }}
                          >
                            Unblock
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No users have been blocked.</p>
        )}
      </CardContent>
    </Card>
  )
} 