import { NextResponse } from 'next/server'

// Import or define the BlockedUser interface
interface BlockedUser {
  id: number
  name: string
  email: string
  blockedAt: string
}

// Assuming you have access to the blockedUsers array
// You might want to use a database in a real application
let blockedUsers: BlockedUser[] = [
  // Existing blocked users
]

// Handle DELETE requests
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const userId = parseInt(id, 10)

  const userIndex = blockedUsers.findIndex(user => user.id === userId)

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found." }, { status: 404 })
  }

  blockedUsers.splice(userIndex, 1)

  return NextResponse.json({ message: "User unblocked successfully." }, { status: 200 })
} 