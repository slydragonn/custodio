package db

import (
	"fmt"
	"log"

	"github.com/usecustodio/custodio/server/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {

	host := utils.Getenv("DB_HOST", "localhost")
	port := utils.Getenv("DB_PORT", "5432")
	user := utils.Getenv("DB_USER", "usecustodio")
	password := utils.Getenv("DB_PASSWORD", "password")
	dbname := utils.Getenv("DB_NAME", "custodio")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	log.Println("Database connected")
	return db
}
