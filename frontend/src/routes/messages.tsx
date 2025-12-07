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

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div>
      <h1 style={{ color: '#333' }}>Messages</h1>
      
      <form onSubmit={addMessage} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a new message..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Message
        </button>
      </form>

      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '5px',
              border: '1px solid #ddd',
            }}
          >
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{message.text}</p>
            <small style={{ color: '#666' }}>
              {new Date(message.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}
