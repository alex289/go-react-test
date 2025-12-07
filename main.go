package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Message struct {
	ID        int       `json:"id"`
	Text      string    `json:"text"`
	Timestamp time.Time `json:"timestamp"`
}

var messages = []Message{
	{ID: 1, Text: "Hello from Go backend!", Timestamp: time.Now()},
	{ID: 2, Text: "This is a demo application", Timestamp: time.Now()},
}

func main() {
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// API routes
	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"status": "ok",
				"time":   time.Now(),
			})
		})

		api.GET("/messages", func(c *gin.Context) {
			c.JSON(http.StatusOK, messages)
		})

		api.POST("/messages", func(c *gin.Context) {
			var newMessage Message
			if err := c.ShouldBindJSON(&newMessage); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			newMessage.ID = len(messages) + 1
			newMessage.Timestamp = time.Now()
			messages = append(messages, newMessage)
			c.JSON(http.StatusCreated, newMessage)
		})
	}

	// Serve static files from the frontend build
	r.Static("/assets", "./frontend/dist/assets")
	r.StaticFile("/", "./frontend/dist/index.html")
	r.NoRoute(func(c *gin.Context) {
		c.File("./frontend/dist/index.html")
	})

	r.Run(":8080")
}
