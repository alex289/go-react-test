package database

import (
	"fmt"
	"log"
	"os"

	"go-react-demo/internal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {
	var err error

	// Get database path from environment or use default
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./data/app.db"
	}

	// Configure GORM
	config := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	// Connect to SQLite database
	DB, err = gorm.Open(sqlite.Open(dbPath), config)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	fmt.Println("Database connected successfully")

	// Auto migrate models
	if err := DB.AutoMigrate(&models.Message{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Seed initial data if database is empty
	seedData()
}

func seedData() {
	var count int64
	DB.Model(&models.Message{}).Count(&count)

	if count == 0 {
		initialMessages := []models.Message{
			{Text: "Hello from Go backend!"},
			{Text: "This is a demo application"},
		}

		DB.Create(&initialMessages)
		fmt.Println("Database seeded with initial data")
	}
}

func GetDB() *gorm.DB {
	return DB
}