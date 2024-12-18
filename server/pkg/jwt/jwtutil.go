package jwt

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("custodio-super-secret-key")

func GenerateToken(userID int) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func VerifyToken(tokenStr string) (jwt.MapClaims, error) {
	token, error := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("invalid signature method")
		}
		return jwtSecret, nil
	})

	if error != nil || !token.Valid {
		return nil, error
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("claims could not be extracted")
	}

	return claims, nil
}
