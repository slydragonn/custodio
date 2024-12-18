package service

import (
	"fmt"

	"github.com/usecustodio/custodio/server/pkg/jwt"
)

type AuthService struct{}

func (s *AuthService) Login(username, password string) (string, error) {
	if username == "" || password == "" {
		return "", fmt.Errorf("invalid Credentials")
	}

	return jwt.GenerateToken(1)
}
