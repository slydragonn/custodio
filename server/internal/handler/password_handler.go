package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/usecustodio/custodio/server/internal/repository"
	"github.com/usecustodio/custodio/server/internal/service"
)

type PasswordHandler struct {
	passwordService service.PasswordService
}

func NewPasswordHandler(passwordService service.PasswordService) *PasswordHandler {
	return &PasswordHandler{passwordService: passwordService}
}

func (h *PasswordHandler) Register(c *gin.Context) {
	userID := c.MustGet("claims").(jwt.MapClaims)["user_id"].(string)

	var req struct {
		Name     string `json:"name"`
		Username string `json:"username"`
		Password string `json:"password"`
		Website  string `json:"website"`
		Note     string `json:"note"`
		Favorite bool   `json:"favorite"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.passwordService.Create(userID, req.Name, req.Username, req.Password, req.Website, req.Note, req.Favorite)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Password registred successfully"})
}

func (h *PasswordHandler) GetUserPasswords(c *gin.Context) {
	userID := c.MustGet("claims").(jwt.MapClaims)["user_id"].(string)

	passwords, err := h.passwordService.GetAll(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, passwords)
}

func (h *PasswordHandler) Update(c *gin.Context) {
	passwordID := c.Param("id")
	userID := c.MustGet("claims").(jwt.MapClaims)["user_id"].(string)

	var req struct {
		Name     string `json:"name,omitempty"`
		Username string `json:"username,omitempty"`
		Password string `json:"password,omitempty"`
		Website  string `json:"website,omitempty"`
		Note     string `json:"note,omitempty"`
		Favorite bool   `json:"favorite,omitempty"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatePassword := repository.Password{
		Name:     req.Name,
		Username: req.Username,
		Password: req.Password,
		Website:  req.Website,
		Note:     req.Note,
		Favorite: req.Favorite,
	}

	err := h.passwordService.Update(passwordID, userID, updatePassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, req)
}

func (h *PasswordHandler) Delete(c *gin.Context) {
	passwordID := c.Param("id")
	userID := c.MustGet("claims").(jwt.MapClaims)["user_id"].(string)

	err := h.passwordService.Delete(passwordID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password deleted successfully"})
}
