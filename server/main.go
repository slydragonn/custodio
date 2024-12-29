package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
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

	//repositories
	userRepo := repository.NewUserRepository(database)
	passwordRepo := repository.NewPasswordRepository(database)

	//services
	authService := service.NewAuthService(userRepo)

	userService := service.NewUserService(userRepo)
	passwordService := service.NewPasswordService(passwordRepo)

	//handlers
	userHandler := handler.NewUserHandler(userService)
	authHandler := handler.NewAuthHandler(authService)
	passwordHandler := handler.NewPasswordHandler(passwordService)

	r := gin.Default()

	//cors middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Client URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
	}))

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
	protected.POST("/passwords", passwordHandler.Register)
	protected.GET("/passwords", passwordHandler.GetUserPasswords)
	protected.PUT("/passwords/:id", passwordHandler.Update)
	protected.DELETE("/passwords/:id", passwordHandler.Delete)

	r.Run(":8080")
}
