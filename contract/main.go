package main

import (
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	routers "github.com/shch989/Hyperledger_TrustCattle/contract/routes"
)

func main() {
	farmerContract := new(routers.Farmer)
	cattleContract := new(routers.Cattle)

	chaincode, err := contractapi.NewChaincode(farmerContract, cattleContract)
	if err != nil {
		log.Panicf("Error creating chaincode: %v", err)
	}

	if err := chaincode.Start(); err != nil {
		log.Panicf("Error starting chaincode: %v", err)
	}
}