package cattle

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type CattleContract struct {
	contractapi.Contract
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

func (s *CattleContract) registerCattle(ctx contractapi.TransactionContextInterface, cattleId, birthdate, gender string, weight int, vaccinationHistory string, parentsId CattleParens, owner string) error {
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
