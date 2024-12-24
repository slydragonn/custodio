package repository

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/usecustodio/custodio/server/internal/model"
	"gorm.io/gorm"
)

type Password struct {
	Name     string
	Username string
	Password string
	Website  string
	Note     string
	Favorite bool
}

type PasswordRepository interface {
	Create(userID string, password *model.Password) error
	GetAll(userID string) ([]model.Password, error)
	Update(passwordID string, userID string, updatedPassword Password) error
	Delete(passwordID, userID string) error
}

type passwordRepository struct {
	db *gorm.DB
}

func NewPasswordRepository(db *gorm.DB) PasswordRepository {
	return &passwordRepository{db: db}
}

func (r *passwordRepository) Create(userID string, password *model.Password) error {
	password.UserID = uuid.MustParse(userID)

	return r.db.Create(&password).Error
}

func (r *passwordRepository) GetAll(userID string) ([]model.Password, error) {
	var passwords []model.Password

	parseUserID := uuid.MustParse(userID)

	err := r.db.Where("user_id = ?", parseUserID).Find(&passwords).Error

	return passwords, err
}

func (r *passwordRepository) Update(passwordID string, userID string, updatedPassword Password) error {
	parsePasswordID := uuid.MustParse(passwordID)

	var password model.Password
	if errSearch := r.db.First(&password, "id = ?", parsePasswordID).Error; errSearch != nil {
		return errSearch
	}

	if password.UserID.String() != userID {
		return fmt.Errorf("you do not own this password")
	}

	if updatedPassword.Name != "" {
		password.Name = updatedPassword.Name
	}
	if updatedPassword.Username != "" {
		password.Username = updatedPassword.Username
	}
	if updatedPassword.Password != "" {
		password.Password = updatedPassword.Password
	}
	if updatedPassword.Website != "" {
		password.Website = updatedPassword.Website
	}
	if updatedPassword.Note != "" {
		password.Note = updatedPassword.Note
	}
	password.Favorite = updatedPassword.Favorite

	return r.db.Save(&password).Error
}

func (r *passwordRepository) Delete(passwordID, userID string) error {
	parsePasswordID := uuid.MustParse(passwordID)

	var password model.Password
	if errSearch := r.db.First(&password, "id = ?", parsePasswordID).Error; errSearch != nil {
		return errSearch
	}

	if password.UserID.String() != userID {
		return fmt.Errorf("You do not own this password")
	}

	return r.db.Delete(&password).Error
}
