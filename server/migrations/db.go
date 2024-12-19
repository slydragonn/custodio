package migrations

import (
	"log"

	"github.com/usecustodio/custodio/server/internal/model"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}
}
