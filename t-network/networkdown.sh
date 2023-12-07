#!/bin/bash


pushd ~/fabric-samples/test-network
    ./network.sh down
popd

rm -rf ../application/config/connection-org1.json
rm -rf ../application/wallet
