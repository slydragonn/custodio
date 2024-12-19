package service

import (
	"fmt"

	"github.com/usecustodio/custodio/server/internal/model"
	"github.com/usecustodio/custodio/server/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	RegisterUser(name, email, password string) error
	GetUserByID(id uint) (*model.User, error)
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) RegisterUser(name, email, password string) error {

	existingUser, _ := s.repo.FindByEmail(email)
	if existingUser != nil {
		return fmt.Errorf("Email already in use")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("Failed to hash password")
	}

	user := &model.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}
	return s.repo.Create(user)
}

func (s *userService) GetUserByID(id uint) (*model.User, error) {
	return s.repo.FindByID(id)
}
