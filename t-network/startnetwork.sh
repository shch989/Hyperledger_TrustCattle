#!/bin/bash

CURRENT_DIR=${PWD}

pushd ~/fabric-samples/test-network

    ./network.sh down

    ./network.sh up createChannel -ca -c tempchannel

    cp organizations/peerOrganizations/org1.example.com/connection-org1.json ${CURRENT_DIR}/../application/config

    ./network.sh deployCC -ccn exp -ccp $CURRENT_DIR/../chaincode/exp -ccl go -c tempchannel

popd
