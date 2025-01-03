package service

import (
	"fmt"

	"github.com/usecustodio/custodio/server/internal/model"
	"github.com/usecustodio/custodio/server/internal/repository"
	"github.com/usecustodio/custodio/server/utils"
)

var key []byte = []byte(utils.Getenv("CRYPTO_KEY", "examplekey123456")) // Must be of 16, 24 or 32 bytes

type PasswordService interface {
	Create(userID, name, username, password, website, note string, favorite bool) (*model.Password, error)
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

func (s *passwordService) Create(userID, name, username, password, website, note string, favorite bool) (*model.Password, error) {

	encryptedUsername, err := utils.Encrypt(username, key)
	if err != nil {
		return &model.Password{}, fmt.Errorf("encrypting username failed")
	}

	encryptedPassword, err := utils.Encrypt(password, key)
	if err != nil {
		return &model.Password{}, fmt.Errorf("encrypting password failed")
	}

	encryptedWebsite, err := utils.Encrypt(website, key)
	if err != nil {
		return &model.Password{}, fmt.Errorf("encrypting website failed")
	}

	encryptedNote, err := utils.Encrypt(note, key)
	if err != nil {
		return &model.Password{}, fmt.Errorf("encrypting note failed")
	}

	newPassword := &model.Password{
		Name:     name,
		Username: encryptedUsername,
		Password: encryptedPassword,
		Website:  encryptedWebsite,
		Note:     encryptedNote,
		Favorite: favorite,
	}

	return s.repo.Create(userID, newPassword)
}

func (s *passwordService) GetAll(userID string) ([]model.Password, error) {

	passwords, err := s.repo.GetAll(userID)
	if err != nil {
		return passwords, err
	}

	var decryptedPasswords []model.Password

	for _, value := range passwords {

		var decryptedPassword model.Password

		decryptedUsername, err := utils.Decrypt(value.Username, key)
		if err != nil {
			return passwords, err
		}
		decryptedPassword.Username = decryptedUsername

		decryptedPasswordValue, err := utils.Decrypt(value.Password, key)
		if err != nil {
			return passwords, err
		}
		decryptedPassword.Password = decryptedPasswordValue

		decryptedWebsite, err := utils.Decrypt(value.Website, key)
		if err != nil {
			return passwords, err
		}
		decryptedPassword.Website = decryptedWebsite

		decryptedNote, err := utils.Decrypt(value.Note, key)
		if err != nil {
			return passwords, err
		}
		decryptedPassword.Note = decryptedNote

		decryptedPassword.ID = value.ID
		decryptedPassword.CreatedAt = value.CreatedAt
		decryptedPassword.UpdateAt = value.UpdateAt
		decryptedPassword.UserID = value.UserID
		decryptedPassword.Name = value.Name
		decryptedPassword.Favorite = value.Favorite

		decryptedPasswords = append(decryptedPasswords, decryptedPassword)
	}

	return decryptedPasswords, nil

}

func (s *passwordService) Update(passwordID string, userID string, updatedPassword repository.Password) error {

	if updatedPassword.Username != "" {
		encryptedUsername, err := utils.Encrypt(updatedPassword.Username, key)
		if err != nil {
			return err
		}
		updatedPassword.Username = encryptedUsername
	}

	if updatedPassword.Password != "" {
		encryptedPassword, err := utils.Encrypt(updatedPassword.Password, key)
		if err != nil {
			return err
		}
		updatedPassword.Password = encryptedPassword
	}

	if updatedPassword.Website != "" {
		encryptedWebsite, err := utils.Encrypt(updatedPassword.Website, key)
		if err != nil {
			return err
		}
		updatedPassword.Website = encryptedWebsite
	}

	if updatedPassword.Note != "" {
		encryptedNote, err := utils.Encrypt(updatedPassword.Note, key)
		if err != nil {
			return err
		}
		updatedPassword.Note = encryptedNote
	}

	return s.repo.Update(passwordID, userID, updatedPassword)
}

func (s *passwordService) Delete(passwordID, userID string) error {
	return s.repo.Delete(passwordID, userID)
}
