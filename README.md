# Go + React Demo Application

A full-stack demo application featuring a Go backend with Gin framework and a React frontend with Vite and TanStack Router, all packaged in a single Docker container.

## Tech Stack

**Backend:**
- Go 1.21
- Gin web framework
- GORM (SQLite)
- Cobra CLI
- RESTful API
- Clean architecture (cmd/internal structure)

**Frontend:**
- React 18
- Vite
- TanStack Router
- TypeScript

**Deployment:**
- Docker (multi-stage build)
- Single container deployment

## Features

- 🚀 Fast development with Vite HMR
- 🎯 Type-safe routing with TanStack Router
- 🔄 RESTful API with CORS support
- 🐳 Production-ready Docker setup
- 📦 Single container deployment
- 🎨 Clean, modern UI

## Project Structure

```
.
├── cmd/
│   └── server/
│       └── main.go        # Application entry point with Cobra CLI
├── internal/
│   ├── server/
│   │   └── server.go      # Server setup and routing
│   ├── handlers/
│   │   ├── health.go      # Health check handler
│   │   └── message.go     # Message handlers
│   ├── models/
│   │   └── message.go     # GORM models
│   ├── database/
│   │   └── database.go    # Database connection and setup
│   └── middleware/
│       └── cors.go        # CORS middleware
├── frontend/
│   ├── src/
│   │   ├── main.tsx       # React entry point
│   │   └── routes/        # TanStack Router routes
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── data/                  # SQLite database files (gitignored)
├── go.mod                 # Go dependencies
├── Dockerfile             # Multi-stage Docker build
└── docker-compose.yml     # Docker Compose configuration
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- (Optional) Go 1.21+ for local development
- (Optional) Node.js 20+ for local development

### Running with Docker

1. **Build and run the container:**

```bash
docker-compose up --build
```

2. **Access the application:**

Open your browser and navigate to `http://localhost:8080`

### Local Development

**Backend (Terminal 1):**

```bash
# Install Go dependencies
go mod download

# Run the backend
go run cmd/server/main.go serve

# Or with custom port
go run cmd/server/main.go serve --port 8080
```

**Frontend (Terminal 2):**

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend dev server will proxy API requests to the backend running on port 8080.

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create a new message
  - Body: `{ "text": "Your message" }`

## Routes

- `/` - Home page with tech stack overview
- `/messages` - Interactive messages page with API integration
- `/about` - About page with backend health status

## Docker Build Process

The Dockerfile uses a multi-stage build:

1. **Frontend Builder**: Builds the React app with Vite
2. **Backend Builder**: Compiles the Go binary
3. **Final Stage**: Combines the Go binary and frontend static files in a minimal Alpine image

This results in a small, efficient container (~30MB) that serves both the API and the frontend.

## Production Deployment

To build and run in production:

```bash
# Build the image
docker build -t go-react-demo .

# Run the container
docker run -p 8080:8080 go-react-demo
```

Or use Docker Compose:

```bash
docker-compose up -d
```

## Environment Variables

- `GIN_MODE` - Set to `release` for production (default: `debug`)

## Development Notes

- The Go backend serves the frontend static files from `/frontend/dist`
- All routes not matching `/api/*` are served the React app (SPA routing)
- CORS is configured to allow requests from any origin in development
- The Vite dev server proxies `/api` requests to the Go backend

## Building for Production

```bash
# Build the Docker image
docker build -t go-react-demo:latest .

# Run the production container
docker run -p 8080:8080 -e GIN_MODE=release go-react-demo:latest
```

## License

MIT

## Author

Demo Application
