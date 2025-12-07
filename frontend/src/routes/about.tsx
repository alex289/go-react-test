import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const [health, setHealth] = useState<any>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => console.error('Failed to fetch health:', err))
  }, [])

  return (
    <div>
      <h1 style={{ color: '#333' }}>About This Demo</h1>
      <p>
        This application demonstrates a full-stack architecture with a Go backend
        and React frontend, all served from a single Docker container.
      </p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Backend Health Status</h2>
        {health ? (
          <div style={{ padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
            <p><strong>Status:</strong> {health.status}</p>
            <p><strong>Server Time:</strong> {new Date(health.time).toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Features</h2>
        <ul>
          <li>RESTful API with Go and Gin</li>
          <li>React with Vite for fast development</li>
          <li>TanStack Router for client-side routing</li>
          <li>Single Docker container deployment</li>
          <li>Static file serving from Go</li>
        </ul>
      </div>
    </div>
  )
}
