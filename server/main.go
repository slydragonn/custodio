package main

import (
	"net/http"

	"github.com/usecustodio/custodio/server/internal/handler"
	"github.com/usecustodio/custodio/server/internal/middleware"
	"github.com/usecustodio/custodio/server/internal/repository"
	"github.com/usecustodio/custodio/server/internal/service"
	"github.com/usecustodio/custodio/server/migrations"
	"github.com/usecustodio/custodio/server/pkg/db"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func main() {

	database := db.Connect()
	migrations.Migrate(database)

	userRepo := repository.NewUserRepository(database)
	authService := service.NewAuthService(userRepo)
	userService := service.NewUserService(userRepo)

	userHandler := handler.NewUserHandler(userService)
	authHandler := handler.NewAuthHandler(authService)

	r := gin.Default()

	//public routes
	r.POST("/register", userHandler.RegisterUser)
	r.POST("/login", authHandler.Login)

	//private routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	protected.GET("/profile", func(c *gin.Context) {
		claims := c.MustGet("claims").(jwt.MapClaims)
		c.JSON(http.StatusOK, gin.H{"message": "Access granted", "claims": claims})
	})

	r.Run(":8080")
}
