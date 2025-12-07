package server

import (
	"fmt"
	"go-react-demo/internal/database"
	"go-react-demo/internal/handlers"
	"go-react-demo/internal/middleware"

	"github.com/gin-gonic/gin"
)

func Start(port string) {
	// Initialize database
	database.Connect()

	// Setup Gin router
	r := gin.Default()

	// Apply middleware
	r.Use(middleware.CORS())

	// API routes
	api := r.Group("/api")
	{
		api.GET("/health", handlers.HealthCheck)
		api.GET("/messages", handlers.GetMessages)
		api.POST("/messages", handlers.CreateMessage)
	}

	// Serve static files from the frontend build
	r.Static("/assets", "./frontend/dist/assets")
	r.StaticFile("/", "./frontend/dist/index.html")
	r.NoRoute(func(c *gin.Context) {
		c.File("./frontend/dist/index.html")
	})

	// Start server
	addr := fmt.Sprintf(":%s", port)
	fmt.Printf("Server starting on %s\n", addr)
	r.Run(addr)
}
