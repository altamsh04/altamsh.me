package main

import (
	"blog-api/internal/database"
	"blog-api/internal/models"
	"blog-api/internal/utils"
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	email := flag.String("email", "", "Admin email address (required)")
	password := flag.String("password", "", "Admin password (required)")
	role := flag.String("role", "admin", "User role (default: admin)")
	flag.Parse()

	if *email == "" || *password == "" {
		fmt.Println("Usage: go run cmd/create-admin/main.go -email=<email> -password=<password> [-role=<role>]")
		flag.PrintDefaults()
		os.Exit(1)
	}

	// Load environment variables
	godotenv.Load()

	// Initialize database
	if err := database.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer database.CloseDB()

	// Run migrations
	if err := database.Migrate(); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(*password)
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	// Create admin user
	auth := &models.Auth{
		Email:    *email,
		Password: hashedPassword,
		Role:     *role,
	}

	if err := database.DB.Create(auth).Error; err != nil {
		log.Fatalf("Failed to create admin user: %v", err)
	}

	fmt.Printf("Admin user created successfully!\n")
	fmt.Printf("Email: %s\n", auth.Email)
	fmt.Printf("Role: %s\n", auth.Role)
	fmt.Printf("ID: %s\n", auth.ID)
}
