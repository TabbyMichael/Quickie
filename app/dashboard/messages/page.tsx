"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MoreVertical, Phone, Video } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data
const conversations = [
  {
    id: 1,
    name: "Sarah Anderson",
    lastMessage: "Hey! How's it going? 😊",
    timestamp: "2m ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    lastMessage: "Would you like to grab coffee sometime?",
    timestamp: "1h ago",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    unread: 0,
    online: false,
  },
  // Add more conversations...
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sending message
    setMessageInput("")
  }

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      {/* Conversations List */}
      <div className="w-full max-w-sm border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search messages"
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                selectedConversation?.id === conversation.id ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <div className="relative">
                <Image
                  src={conversation.image}
                  alt={conversation.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={selectedConversation.image}
                alt={selectedConversation.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="font-medium">{selectedConversation.name}</h2>
                {selectedConversation.online && (
                  <span className="text-sm text-green-500">Online</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Delete Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {/* Add message components here */}
          </ScrollArea>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  )
} 