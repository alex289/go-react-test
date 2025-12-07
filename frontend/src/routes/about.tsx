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
      <h1 className="text-gray-800 text-3xl font-bold mb-4">About This Demo</h1>
      <p className="mb-5 text-gray-700">
        This application demonstrates a full-stack architecture with a Go backend
        and React frontend, all served from a single Docker container.
      </p>
      
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-3">Backend Health Status</h2>
        {health ? (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="mb-2"><strong>Status:</strong> {health.status}</p>
            <p><strong>Server Time:</strong> {new Date(health.time).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-3">Features</h2>
        <ul className="list-disc list-inside space-y-2">
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
