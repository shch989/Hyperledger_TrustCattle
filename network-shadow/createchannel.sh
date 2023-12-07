#!/bin/bash

export FABRIC_CFG_PATH=$PWD

CHANNEL_NAME="shadowchannel"

set -e

export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export CORE_PEER_TLS_ENABLED=true

function setOrg {
    ORG=$1
    
    if [ $ORG -eq 1 ]; then
        export CORE_PEER_LOCALMSPID="Org1MSP"
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
        export CORE_PEER_ADDRESS=localhost:7051
    else
        export CORE_PEER_LOCALMSPID="Org2MSP"
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
        export CORE_PEER_ADDRESS=localhost:9051
    fi
}

# 채널 트랜젝션, 앵커 트랜젝션 생성
echo "--- Create Channel Transactions" 
set -x
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./config/${CHANNEL_NAME}.tx -channelID $CHANNEL_NAME

configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./config/AnchorOrg1.tx -asOrg Org1MSP -channelID $CHANNEL_NAME

configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./config/AnchorOrg2.tx -asOrg Org2MSP -channelID $CHANNEL_NAME
set +x

# ## 채널 생성
setOrg 1
set -x
peer channel create -o localhost:7050 -c $CHANNEL_NAME --ordererTLSHostnameOverride orderer.example.com -f ./config/${CHANNEL_NAME}.tx --outputBlock ./config/${CHANNEL_NAME}.block --tls --cafile $ORDERER_CA
set +x

sleep 3

# org1접속 환경변수 세팅 -> 채널이름.tx -> 채널이름.block
# ## 채널 조인
# org1 -> 채널이름.block -> peer channel join
echo "--- org1 channel join"
set -x
peer channel join -b ./config/${CHANNEL_NAME}.block
set +x

# org2 -> 채널이름.block -> peer channel join
echo "--- org2 channel join"
setOrg 2
set -x
peer channel join -b ./config/${CHANNEL_NAME}.block
set +x

# ## 채널 업데이트
# org1 ->앵커.tx -> peer channel update
echo "--- org2 channel update"
set -x
peer channel update -f ./config/AnchorOrg2.tx -o localhost:7050 -c $CHANNEL_NAME --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA
set +x
sleep 3

# org2 ->앵커.tx -> peer channel update
echo "--- org1 channel update"
setOrg 1
set -x
peer channel update -f ./config/AnchorOrg1.tx -o localhost:7050 -c $CHANNEL_NAME --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA
set +x
sleep 3