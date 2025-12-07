import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-5 font-sans">
        <nav className="mb-5 border-b-2 border-gray-800 pb-2.5">
          <Link to="/" className="mr-5 text-blue-600 hover:text-blue-800 no-underline">
            Home
          </Link>
          <Link to="/messages" className="mr-5 text-blue-600 hover:text-blue-800 no-underline">
            Messages
          </Link>
          <Link to="/about" className="text-blue-600 hover:text-blue-800 no-underline">
            About
          </Link>
        </nav>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
