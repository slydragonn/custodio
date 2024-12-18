package main

import (
	"net/http"

	"github.com/usecustodio/custodio/server/internal/handler"
	"github.com/usecustodio/custodio/server/internal/middleware"
	"github.com/usecustodio/custodio/server/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func main() {
	r := gin.Default()

	authService := &service.AuthService{}
	authHandler := handler.NewAuthHandler(authService)

	//public routes
	r.POST("/login", authHandler.Login)

	//private routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	protected.GET("/profile", func(c *gin.Context) {
		claims := c.MustGet("claims").(jwt.MapClaims)
		c.JSON(http.StatusOK, gin.H{"user_id": claims["user_id"]})
	})

	r.Run(":8080")
}
