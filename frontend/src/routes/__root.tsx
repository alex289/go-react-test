import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <nav style={{ marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#0066cc' }}>
            Home
          </Link>
          <Link to="/messages" style={{ marginRight: '20px', textDecoration: 'none', color: '#0066cc' }}>
            Messages
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: '#0066cc' }}>
            About
          </Link>
        </nav>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
