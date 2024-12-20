package service

import (
	"fmt"

	"github.com/usecustodio/custodio/server/internal/repository"
	"github.com/usecustodio/custodio/server/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	Authenticate(email, password string) (string, error)
}

type authService struct {
	repo repository.UserRepository
}

func NewAuthService(repo repository.UserRepository) AuthService {
	return &authService{repo: repo}
}

func (s *authService) Authenticate(email, password string) (string, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		return "", fmt.Errorf("Invalid credentials")
	}

	//validate hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", fmt.Errorf("Invalid credentials")
	}

	tokenStr, err := jwt.GenerateToken(user.ID.String())
	if err != nil {
		return "", fmt.Errorf("Failed to generate token")
	}

	return tokenStr, nil
}
