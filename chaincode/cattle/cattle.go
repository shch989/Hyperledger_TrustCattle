package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract 정의
type SmartContract struct {
	contractapi.Contract
}

// CattleParens 정의
type CattleParens struct {
	Dad string `json:"dad"`
	Mom string `json:"mom"`
}

// VaccinationRecord 정의
type VaccinationRecord struct {
	VaccinID   string `json:"vaccinId"`
	Vaccindate string `json:"vaccindate"`
}

// Cattle 정의
type Cattle struct {
	CattleID           string              `json:"cattleId"`
	Birthdate          string              `json:"birthdate"`
	Gender             string              `json:"gender"`
	Weight             string              `json:"weight"`
	VaccinationHistory []VaccinationRecord `json:"vaccinationHistory"`
	ParentsID          CattleParens        `json:"parentsId"`
	Owner              string              `json:"owner"`
	State              string              `json:"state"`
	Price              int                 `json:"price"`
	AccountNumber      string              `json:"accountNumber"`
}

type HistoryQueryResult struct {
	Record    	*Cattle    `json:"record"`
	TxId     	string    `json:"txId"`
	Timestamp 	time.Time `json:"timestamp"`
	IsDelete  	bool      `json:"isDelete"`
}

// CreateCattle 함수 정의
func (s *SmartContract) CreateCattle(ctx contractapi.TransactionContextInterface, cattleId, birthdate, gender, weight string, vaccinations []VaccinationRecord, dad, mom, owner string) error {
	// 중복 확인
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return err
	}
	if cattleJSON != nil {
		return fmt.Errorf("Duplicated ID: %s", cattleId)
	}

	// CattleParens 생성
	parentsID := CattleParens{
		Dad: dad,
		Mom: mom,
	}

	// Cattle 생성
	cattle := Cattle{
		CattleID:           cattleId,
		Birthdate:          birthdate,
		Gender:             gender,
		Weight:             weight,
		VaccinationHistory: vaccinations,
		ParentsID:          parentsID,
		Owner:              owner,
		State:              "breeding",
	}

	// JSON 직렬화
	cattleJSON, err = json.Marshal(cattle)
	if err != nil {
		return err
	}

	// PutState
	return ctx.GetStub().PutState(cattleId, cattleJSON)
}

// ReadAsset
func (s *SmartContract) ReadCattle(ctx contractapi.TransactionContextInterface, cattleId string) (*Cattle, error) {
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if cattleJSON == nil {
		return nil, fmt.Errorf("the event %s does not exist", cattleId)
	}

	var cattle Cattle
	err = json.Unmarshal(cattleJSON, &cattle)
	if err != nil {
		return nil, err
	}

	return &cattle, nil
}

// QueryCattleHistory
func (s *SmartContract) QueryCattleHistory(ctx contractapi.TransactionContextInterface, cattleId string) ([]HistoryQueryResult, error) {
	log.Printf("QueryCattleHistory: ID %v", cattleId)

	resultsIterator, err := ctx.GetStub().GetHistoryForKey(cattleId)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var records []HistoryQueryResult

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var cattle Cattle
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &cattle)
			if err != nil {
				return nil, err
			}
		} else {
			cattle = Cattle{
				CattleID: cattleId,
			}
		}

		timestamp, err := ptypes.Timestamp(response.Timestamp)
		if err != nil {
			return nil, err
		}

		record := HistoryQueryResult{
			TxId: 		response.TxId,
			Timestamp:	timestamp,
			Record:		&cattle,
			IsDelete:	response.IsDelete,
		}
		records = append(records, record)
	}
	return records, nil
}

// main 함수 정의
func main() {
	cattleChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating cattle event chaincode: %v", err)
	}

	if err := cattleChaincode.Start(); err != nil {
		log.Panicf("Error starting cattle event chaincode: %v", err)
	}
}