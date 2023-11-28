package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
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

type CattleParens struct {
	Mom string `json:"mom"`
	Dad string `json:"dad"`
}

type Cattle struct {
	CattleID           string       `json:"cattleId"`
	Birthdate          string       `json:"birthdate"`
	Gender             string       `json:"gender"`
	Weight             int          `json:"weight"`
	VaccinationHistory string       `json:"vaccinationHistory"`
	ParentsID          CattleParens `json:"parentsId"`
	Owner              string       `json:"owner"`
}

func (s *SmartContract) signup(ctx contractapi.TransactionContextInterface, userId, name, number, email, password, address string) error {
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

func (s *SmartContract) registerCattle(ctx contractapi.TransactionContextInterface, cattleId, birthdate, gender string, weight int, vaccinationHistory string, parentsId CattleParens, owner string) error {
	// 중복확인
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return err
	}
	if cattleJSON != nil {
		return fmt.Errorf("Duplicated ID: %s", cattleId)
	}

	// 구조체 생성
	cattle := Cattle{
		CattleID:           cattleId,
		Birthdate:          birthdate,
		Gender:             gender,
		Weight:             weight,
		VaccinationHistory: vaccinationHistory,
		ParentsID:          parentsId,
		Owner:              owner,
	}

	// 마샬-직렬화 JSON
	cattleJSON, err = json.Marshal(cattle)
	if err != nil {
		return err
	}

	// PutState
	return ctx.GetStub().PutState(cattleId, cattleJSON)
}

func main() {
	chaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating chaincode: %v", err)
	}

	if err := chaincode.Start(); err != nil {
		log.Panicf("Error starting chaincode: %v", err)
	}
}
