import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-bold mb-4">Welcome to Go + React Demo</h1>
      <p className="mb-5 text-gray-700">This is a demonstration of a Go backend with Gin and a React frontend with TanStack Router.</p>
      <div className="mt-5 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Tech Stack:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Backend:</strong> Go with Gin framework</li>
          <li><strong>Frontend:</strong> React with Vite and TanStack Router</li>
          <li><strong>Deployment:</strong> Single Docker container</li>
        </ul>
      </div>
      <Button className='mt-4'>Helloooo</Button>
    </div>
  )
}
