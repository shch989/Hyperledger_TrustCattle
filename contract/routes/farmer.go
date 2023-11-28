package farmer

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type FarmerContract struct {
	contractapi.Contract
}

type User struct {
	UserID   string `json:"userId"`
	Name     string `json:"name"`
	Number   string `json:"number"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Address  string `json:"address"`
}

func (s *FarmerContract) signup(ctx contractapi.TransactionContextInterface, userId, name, number, email, password, address string) error {
	// 중복확인
	farmerJSON, err := ctx.GetStub().GetState(userId)
	if err != nil {
		return err
	}
	if farmerJSON != nil {
		return fmt.Errorf("Duplicated ID: %s", userId)
	}

	// 구조체 생성
	farmer := User{
		UserID:   userId,
		Name:     name,
		Number:   number,
		Email:    email,
		Password: password,
		Address:  address,
	}

	// 마샬-직렬화 JSON
	farmerJSON, err = json.Marshal(farmer)
	if err != nil {
		return err
	}

	// PutState
	return ctx.GetStub().PutState(userId, farmerJSON)
}