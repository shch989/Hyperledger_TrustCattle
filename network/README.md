# 네트워크 실행 방법
## 네트워크 초기화
```
# 현재 수행 상황 확인
docker ps -a
docker network ls
docker volume ls
docker images dev-*

# 초기화 명령들
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images dev-* -q)
docker network prune
docker volume prune
```

## 네트워크 작성 및 수행
```
cd network
mkdir config organizations
mkdir organizations/fabric-ca
touch docker-compose.yaml configtx.yaml registerenroll.sh ccp-template.json ccp-generate.sh startnetwork.sh createchannel.sh networkdown.sh deploy.sh
chmod +x *.sh
```

## 채널 구성
```
./createchannel.sh
```
## 채널 확인
```
peer channel list
docker logs peer0.org1.example.co
```