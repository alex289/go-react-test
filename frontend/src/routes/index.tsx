import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h1 style={{ color: '#333' }}>Welcome to Go + React Demo</h1>
      <p>This is a demonstration of a Go backend with Gin and a React frontend with TanStack Router.</p>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Tech Stack:</h3>
        <ul>
          <li><strong>Backend:</strong> Go with Gin framework</li>
          <li><strong>Frontend:</strong> React with Vite and TanStack Router</li>
          <li><strong>Deployment:</strong> Single Docker container</li>
        </ul>
      </div>
    </div>
  )
}
