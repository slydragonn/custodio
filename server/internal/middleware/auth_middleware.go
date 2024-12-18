package middleware

import (
	"net/http"
	"strings"

	"github.com/usecustodio/custodio/server/pkg/jwt"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not provided"})
			c.Abort()
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := jwt.VerifyToken(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Token"})
			c.Abort()
			return
		}

		c.Set("claims", claims)
		c.Next()
	}
}
