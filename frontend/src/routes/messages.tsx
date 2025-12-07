import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/messages')({
  component: Messages,
})

interface Message {
  id: number
  text: string
  timestamp: string
}

function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      if (!response.ok) throw new Error('Failed to fetch messages')
      const data = await response.json()
      setMessages(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newMessage }),
      })
      if (!response.ok) throw new Error('Failed to add message')
      await fetchMessages()
      setNewMessage('')
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (loading) return <div className="text-gray-600">Loading...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-bold mb-4">Messages</h1>
      
      <form onSubmit={addMessage} className="mb-5">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a new message..."
          className="px-3 py-2 w-80 mr-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" >
          Add Message
        </Button> 
      </form>

      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p className="mb-1 font-bold text-gray-800">{message.text}</p>
            <small className="text-gray-600">
              {new Date(message.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}
