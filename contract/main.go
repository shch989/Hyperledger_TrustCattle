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

type VaccinationRecord struct {
	VaccinID   string `json:"vaccinId"`
	Vaccindate string `json:"vaccindate"`
}

type Cattle struct {
	CattleID           string              `json:"cattleId"`
	Birthdate          string              `json:"birthdate"`
	Gender             string              `json:"gender"`
	Weight             int                 `json:"weight"`
	VaccinationHistory []VaccinationRecord `json:"vaccinationHistory"`
	ParentsID          CattleParens        `json:"parentsId"`
	Owner              string              `json:"owner"`
	State              string              `json:"state"`
	Price              int                 `json:"price"`
	AccountNumber      string              `json:"accountNumber"`
}

// 사용자 등록
func (s *SmartContract) createUser(ctx contractapi.TransactionContextInterface, userId, name, number, email, password, address string) error {
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

// 사용자 로그인
func (s *SmartContract) loginUser(ctx contractapi.TransactionContextInterface, userId string, password string) (string, error) {
	// 사용자 정보 가져오기
	userJSON, err := ctx.GetStub().GetState("user:" + userId)
	if err != nil {
		return "", err
	}
	if userJSON == nil {
		return "", fmt.Errorf("User not found: %s", userId)
	}

	// 사용자 정보 언마샬
	var user User
	err = json.Unmarshal(userJSON, &user)
	if err != nil {
		return "", err
	}

	// 제공된 비밀번호와 저장된 비밀번호 비교
	if user.Password != password {
		return "", fmt.Errorf("Password Mismatch: %s", userId)
	}

	return userId, nil // 로그인 성공 시 사용자 아이디 반환
}

// 사용자 정보 수정
func (s *SmartContract) updateUser(ctx contractapi.TransactionContextInterface, userId, name, number, email, address string) error {
	// 기존 사용자 정보 가져오기
	userJSON, err := ctx.GetStub().GetState(userId)
	if err != nil {
		return err
	}
	if userJSON == nil {
		return fmt.Errorf("User not found: %s", userId)
	}

	// 기존 사용자 정보 언마샬
	var existingUser User
	err = json.Unmarshal(userJSON, &existingUser)
	if err != nil {
		return err
	}

	// 수정된 정보로 업데이트
	existingUser.Name = name
	existingUser.Number = number
	existingUser.Email = email
	existingUser.Address = address

	// 업데이트된 사용자 정보 마샬-직렬화
	updatedUserJSON, err := json.Marshal(existingUser)
	if err != nil {
		return err
	}

	// PutState로 업데이트된 정보 저장
	return ctx.GetStub().PutState(userId, updatedUserJSON)
}

// 가축 등록
func (s *SmartContract) createCattle(ctx contractapi.TransactionContextInterface, cattleId, birthdate, gender string, weight int, vaccinationHistory []VaccinationRecord, parentsId CattleParens, owner string) error {
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
		State:              "breeding",
	}

	// 마샬-직렬화 JSON
	cattleJSON, err = json.Marshal(cattle)
	if err != nil {
		return err
	}

	// PutState
	return ctx.GetStub().PutState(cattleId, cattleJSON)
}

// 가축 정보 업데이트
func (s *SmartContract) updateCattle(ctx contractapi.TransactionContextInterface, cattleId string, newWeight int, newVaccinationRecords []VaccinationRecord) error {
	// 가축 정보 가져오기
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return err
	}
	if cattleJSON == nil {
		return fmt.Errorf("Cattle not found: %s", cattleId)
	}

	// 기존 가축 정보 언마샬
	var existingCattle Cattle
	err = json.Unmarshal(cattleJSON, &existingCattle)
	if err != nil {
		return err
	}

	// 체중 업데이트
	existingCattle.Weight = newWeight

	// 접종 기록 추가
	existingCattle.VaccinationHistory = append(existingCattle.VaccinationHistory, newVaccinationRecords...)

	// 업데이트된 가축 정보 마샬-직렬화
	updatedCattleJSON, err := json.Marshal(existingCattle)
	if err != nil {
		return err
	}

	// PutState로 업데이트된 정보 저장
	return ctx.GetStub().PutState(cattleId, updatedCattleJSON)
}

// 사용자의 소유 가축 목록 가져오기
func (s *SmartContract) getUserCattles(ctx contractapi.TransactionContextInterface, userId string) ([]Cattle, error) {
	// 모든 가축 가져오기
	cattleIterator, err := ctx.GetStub().GetStateByPartialCompositeKey("cattle", []string{})
	if err != nil {
		return nil, err
	}
	defer cattleIterator.Close()

	var userCattles []Cattle

	// 소유자 ID에 해당하는 가축 필터링
	for cattleIterator.HasNext() {
		responseRange, err := cattleIterator.Next()
		if err != nil {
			return nil, err
		}

		// 가축 정보 가져오기
		cattleJSON, err := ctx.GetStub().GetState(responseRange.Key)
		if err != nil {
			return nil, err
		}

		// 가축 정보 언마샬
		var cattle Cattle
		err = json.Unmarshal(cattleJSON, &cattle)
		if err != nil {
			return nil, err
		}

		// 소유자 ID 확인
		if cattle.Owner == userId {
			userCattles = append(userCattles, cattle)
		}
	}

	return userCattles, nil
}

// 가축 판매 요청
func (s *SmartContract) saleCattle(ctx contractapi.TransactionContextInterface, cattleId, buyerId string, price int, accountNumber string) error {
	// 가축 정보 가져오기
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return err
	}
	if cattleJSON == nil {
		return fmt.Errorf("Cattle not found: %s", cattleId)
	}

	// 기존 가축 정보 언마샬
	var existingCattle Cattle
	err = json.Unmarshal(cattleJSON, &existingCattle)
	if err != nil {
		return err
	}

	// 판매 상태인지 확인
	if existingCattle.State != "breeding" {
		return fmt.Errorf("Cannot request sale for cattle in state: %s", existingCattle.State)
	}

	// 판매 상태로 변경
	existingCattle.State = "forSale"
	existingCattle.Price = price
	existingCattle.AccountNumber = accountNumber

	// 업데이트된 가축 정보 마샬-직렬화
	updatedCattleJSON, err := json.Marshal(existingCattle)
	if err != nil {
		return err
	}

	// PutState로 업데이트된 정보 저장
	return ctx.GetStub().PutState(cattleId, updatedCattleJSON)
}

// 판매 중인 가축 목록 조회
func (s *SmartContract) queryCattlesForSale(ctx contractapi.TransactionContextInterface) ([]*Cattle, error) {
	// 모든 가축 조회
	resultsIterator, err := ctx.GetStub().GetStateByPartialCompositeKey("cattle", []string{})
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var cattles []*Cattle
	for resultsIterator.HasNext() {
		result, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var cattle Cattle
		if err := json.Unmarshal(result.Value, &cattle); err != nil {
			return nil, err
		}

		// 판매 중인 가축만 추가
		if cattle.State == "forSale" {
			cattles = append(cattles, &cattle)
		}
	}

	return cattles, nil
}

// 가축 구매 요청
func (s *SmartContract) purchaseCattle(ctx contractapi.TransactionContextInterface, cattleId, buyerId string) error {
	// 가축 정보 가져오기
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return err
	}
	if cattleJSON == nil {
		return fmt.Errorf("Cattle not found: %s", cattleId)
	}

	// 기존 가축 정보 언마샬
	var existingCattle Cattle
	err = json.Unmarshal(cattleJSON, &existingCattle)
	if err != nil {
		return err
	}

	// 판매 상태인지 확인
	if existingCattle.State != "forSale" {
		return fmt.Errorf("Cannot request purchase for cattle not in 'forSale' state")
	}

	// 구매 요청자 확인
	if existingCattle.Owner == buyerId {
		return fmt.Errorf("Buyer ID matches current owner")
	}

	// 구매 요청 상태로 변경
	existingCattle.State = "purchaseRequested"

	// 업데이트된 가축 정보 마샬-직렬화
	updatedCattleJSON, err := json.Marshal(existingCattle)
	if err != nil {
		return err
	}

	// PutState로 업데이트된 정보 저장
	return ctx.GetStub().PutState(cattleId, updatedCattleJSON)
}

// 가축 구매 수락
func (s *SmartContract) acceptCattlePurchase(ctx contractapi.TransactionContextInterface, cattleId, buyerId string) error {
	// 가축 정보 가져오기
	cattleJSON, err := ctx.GetStub().GetState(cattleId)
	if err != nil {
		return err
	}
	if cattleJSON == nil {
		return fmt.Errorf("Cattle not found: %s", cattleId)
	}

	// 기존 가축 정보 언마샬
	var existingCattle Cattle
	err = json.Unmarshal(cattleJSON, &existingCattle)
	if err != nil {
		return err
	}

	// 판매 요청 상태인지 확인
	if existingCattle.State != "purchaseRequested" {
		return fmt.Errorf("Cannot accept purchase for cattle not in 'purchaseRequested' state")
	}

	// 판매 요청자 확인
	if existingCattle.Owner != buyerId {
		return fmt.Errorf("Buyer ID does not match current owner")
	}

	// 소유자 변경
	existingCattle.Owner = buyerId

	// 판매 상태로 변경
	existingCattle.State = "breeding"

	// 판매 계좌 초기화
	existingCattle.AccountNumber = ""

	// 업데이트된 가축 정보 마샬-직렬화
	updatedCattleJSON, err := json.Marshal(existingCattle)
	if err != nil {
		return err
	}

	// PutState로 업데이트된 정보 저장
	return ctx.GetStub().PutState(cattleId, updatedCattleJSON)
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
