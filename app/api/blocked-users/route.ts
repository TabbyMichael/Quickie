import { NextResponse } from 'next/server'

// Mock database (Replace this with your actual database integration)
let blockedUsers: BlockedUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    blockedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    blockedAt: new Date().toISOString(),
  },
]

// Define the BlockedUser interface
interface BlockedUser {
  id: number
  name: string
  email: string
  blockedAt: string
}

// Handle GET requests
export async function GET() {
  return NextResponse.json(blockedUsers)
}

// Handle POST requests (to block a new user)
export async function POST(request: Request) {
  const { name, email } = await request.json()

  const newUser: BlockedUser = {
    id: blockedUsers.length + 1,
    name,
    email,
    blockedAt: new Date().toISOString(),
  }

  blockedUsers.push(newUser)

  return NextResponse.json(newUser, { status: 201 })
} 