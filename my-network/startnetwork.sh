#!/bin/bash

# 환경설정
set -e
# configtx.yaml 이 있는 디렉토리를 FABRIC_CFG_PATH로 설정
export FABRIC_CFG_PATH=${PWD}

# clean up
if [ -d "./organizations/peerOrganizations" ]; then
    rm -rf organizations/peerOrganizations && rm -rf organizations/ordererOrganizations
fi


docker-compose down 
sleep 3

# prequistories
if [ ! -d config ]; then
    mkdir config
fi

if [ ! -d organizations/fabric-ca ]; then
    mkdir -p organizations/fabric-ca
fi

# docker network 시작 - ca
echo "---Generating certificates using fabric ca"
set -x
docker-compose -f docker-compose.yaml up -d ca_org1 ca_org2 ca_org3 ca_orderer
set +x

sleep 3

# register enroll 쉘스크립트 수행
. registerenroll.sh


createOrg1
createOrg2
createOrg3
createOrderer

echo "--- Generating Orderer Genesis block"
set -x
configtxgen -profile ThreeOrgsOrdererGenesis --channelID system-channel -outputBlock ./config/genesis.block

docker-compose -f docker-compose.yaml up -d orderer.example.com peer0.org1.example.com peer0.org2.example.com peer0.org3.example.com
set +x

sleep 5

echo "--- ccp generation "
./ccp-generate.sh #org2 -> connection-org2.json

if [ ! -d ../application/server/src/config ]; then
    mkdir ../application/server/src/config
fi

cp ./connection-org2.json ../application/server/src/config