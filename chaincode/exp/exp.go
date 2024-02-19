// 패키지 정의
package main

// 외부모듈 포함
import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// 체인코드 객체정의
type SmartContract struct{
	contractapi.Contract
}

// event 구조체 정의
type ExpEvent struct {
	EventID				string `json:"eid"`
	SubjectID			string `json:"sid"`
	KidsCafeID			string `json:"kid"`
	Details				string `json:"details"`
	Status				string `json:"status"` // {proposed, confirmed, registered, inoperating, closed}
}

type HistoryQueryResult struct {
	Record    	*ExpEvent    `json:"record"`
	TxId     	string    `json:"txId"`
	Timestamp 	time.Time `json:"timestamp"`
	IsDelete  	bool      `json:"isDelete"`
}


// CreateAsset
func (s *SmartContract) ProposeEXP(ctx contractapi.TransactionContextInterface, eid string, sid string, kid string) error {
	
	// 기등록된 event id가 있는지 검증
	exists, err := s.EXPExists(ctx, eid)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the event %s already exists", eid)
	}

	exp := ExpEvent{
		EventID:			eid,
		SubjectID:			sid,
		KidsCafeID:			kid,
		Details:			"",
		Status:				"proposed",
	}

	expJSON, err := json.Marshal(exp)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(eid, expJSON)

}

// AssetExists
func (s *SmartContract) EXPExists(ctx contractapi.TransactionContextInterface, eid string) (bool, error) {
	expJSON, err := ctx.GetStub().GetState(eid)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	// return assetJSON != nil, nil
	if expJSON == nil {
		return false, nil
	} else {
		return true, nil
	}
}

// ReadAsset
func (s *SmartContract) ReadEXP(ctx contractapi.TransactionContextInterface, eid string) (*ExpEvent, error) {
	expJSON, err := ctx.GetStub().GetState(eid)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if expJSON == nil {
		return nil, fmt.Errorf("the event %s does not exist", eid)
	}

	var exp ExpEvent
	err = json.Unmarshal(expJSON, &exp)
	if err != nil {
		return nil, err
	}

	return &exp, nil
}

// Transfer
func (s *SmartContract) ConfirmEXP(ctx contractapi.TransactionContextInterface, eid string) error {
	exp, err := s.ReadEXP(ctx, eid)
	if err != nil {
		return err
	}
	// 검증1 Propose -> 등록한 대상운영기관의 인증서인지 검증
	// 검증2 해당이벤트 Status == proposed
	if exp.Status != "proposed" {
		return fmt.Errorf("the event: %v is not in proposed status", eid)
	}

	exp.Status = "confirmed"
	expJSON, err := json.Marshal(exp)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(eid, expJSON)
}

// QueryEggHistory
func (s *SmartContract) QueryEXPHistory(ctx contractapi.TransactionContextInterface, eid string) ([]HistoryQueryResult, error) {
	log.Printf("QueryEXPHistory: ID %v", eid)

	resultsIterator, err := ctx.GetStub().GetHistoryForKey(eid)
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

		var exp ExpEvent
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &exp)
			if err != nil {
				return nil, err
			}
		} else {
			exp = ExpEvent{
				EventID: eid,
			}
		}

		timestamp, err := ptypes.Timestamp(response.Timestamp)
		if err != nil {
			return nil, err
		}

		record := HistoryQueryResult{
			TxId: 		response.TxId,
			Timestamp:	timestamp,
			Record:		&exp,
			IsDelete:	response.IsDelete,
		}
		records = append(records, record)
	}
	return records, nil
}


// main
func main() {
	expChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating exp event chaincode: %v", err)
	}

	if err := expChaincode.Start(); err != nil {
		log.Panicf("Error starting exp event chaincode: %v", err)
	}
}
