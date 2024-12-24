package service

import (
	"fmt"

	"github.com/usecustodio/custodio/server/internal/model"
	"github.com/usecustodio/custodio/server/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type PasswordService interface {
	Create(userID, name, username, password, website, note string, favorite bool) error
	GetAll(userID string) ([]model.Password, error)
	Update(passwordID string, userID string, updatedPassword repository.Password) error
	Delete(passwordID, userID string) error
}

type passwordService struct {
	repo repository.PasswordRepository
}

func NewPasswordService(repo repository.PasswordRepository) PasswordService {
	return &passwordService{repo: repo}
}

func (s *passwordService) Create(userID, name, username, password, website, note string, favorite bool) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password")
	}

	newPassword := &model.Password{
		Name:     name,
		Username: username,
		Password: string(hashedPassword),
		Website:  website,
		Note:     note,
		Favorite: favorite,
	}

	return s.repo.Create(userID, newPassword)
}

func (s *passwordService) GetAll(userID string) ([]model.Password, error) {
	return s.repo.GetAll(userID)
}

func (s *passwordService) Update(passwordID string, userID string, updatedPassword repository.Password) error {
	return s.repo.Update(passwordID, userID, updatedPassword)
}

func (s *passwordService) Delete(passwordID, userID string) error {
	return s.repo.Delete(passwordID, userID)
}
