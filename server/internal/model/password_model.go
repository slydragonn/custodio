package model

import "github.com/google/uuid"

type Password struct {
	Base
	Name     string `gorm:"size:100;not null"`
	Username string `gorm:"size:100;not null"`
	Password string `gorm:"not null"`
	Website  string
	Note     string
	Favorite bool
	UserID   uuid.UUID
}
