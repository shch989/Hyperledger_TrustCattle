#!/bin/bash

docker-compose down

# clean up
if [ -d "./organizations/peerOrganizations" ]; then
    rm -rf organizations/peerOrganizations && rm -rf organizations/ordererOrganizations
    sudo rm -rf ./organizations/fabric-ca/*
fi

rm -rf config/*

rm -rf ../application/server/src/config/connection-org2.json

rm -rf ../application/server/src/wallet
