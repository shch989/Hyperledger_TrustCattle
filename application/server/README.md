# 설치 모듈
### NestJS Cli
```
npm i -g @nestjs/cli
```
### NestJS 폴더 생성
```
nest new server
```
### fabric-network 모듈 설치
```
npm install fabric-network
```
### fabric-ca-client 모듈 설치
```
npm install fabric-ca-client
```
### class-validator 모듈 설치
```
npm install class-validator
```
### class-transformer 모듈 설치
```
npm install class-transformer
```

<br/>

# RestAPI 설계
## v0.1.0
| 기능                    | Url                                              | Method | Variables                                                                 |
| ----------------------- | ------------------------------------------------ | ------ | ------------------------------------------------------------------------- |
| 사육자 회원가입         | /auth/signup                                     | POST   | userId, name, number, email, password, address                            |
| 사육자 로그인           | /auth/login                                      | POST   | userId, password                                                          |
| 사육자 정보 수정        | /auth/update-profile/:userId                     | PUT    | name, number, email, address                                              |
| 가축 등록               | /cattle/register                                 | POST   | cattleId, birthdate, gender, weight, vaccinationHistory, parentsId, owner |
| 가축 정보 수정          | /cattle/update-info/:cattleId                    | PUT    | weight, vaccinationHistory                                                |
| 판매중인 가축 정보 출력 | /cattle/for-sale                                 | GET    | (No variables)                                                            |
| 가축 판매 신청          | /cattle/sell-request/:cattleId                   | PUT    | cattleData, price                                                         |
| 가축 구매 요청          | /transaction/purchase-request/:cattleId/:buyerId | PUT    | cattleId, buyerId                                                         |
| 거래 완료               | /transaction/complete-transaction                | PUT    | cattleId, buyerId    