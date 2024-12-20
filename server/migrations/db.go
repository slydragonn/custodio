package migrations

import (
	"log"

	"github.com/usecustodio/custodio/server/internal/model"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	err := db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";").Error
	if err != nil {
		log.Fatalf("Failed to enable uuid-ossp extension: %v", err)
	}

	migrateErr := db.AutoMigrate(&model.User{})
	if migrateErr != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}
}
