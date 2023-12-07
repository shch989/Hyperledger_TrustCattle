import React from 'react'
import styled from 'styled-components'
import MainBackground from '../../components/UI/MainBackground'
import MainTitle from '../../components/common/Main/MainTitle'
import CattleCardBar from '../../components/cattle/CattleCardBar'

const MainTitleStyle = styled.div`
  margin-top: 20px;
`

const cattleData = [
  {
    "cattleID": 1,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 500,
    "vaccinationRecord": [{ "vaccineName": "qwe", "date": "2021-01-02" }, { "vaccineName": "qwees", "date": "2021-01-05" }],
    "parentCattleID": { "mom": 125, "dad": 25 },
    "survivalStatus": "Alive",
    "ownerID": 11,
    "price": 500000
  },
  {
    "cattleID": 2,
    "birthDate": "2022-02-01",
    "gender": "Female",
    "weight": 550,
    "vaccinationRecord": [{ "vaccineName": "abc", "date": "2021-02-02" }, { "vaccineName": "xyz", "date": "2021-02-05" }],
    "parentCattleID": { "mom": 130, "dad": 30 },
    "survivalStatus": "Alive",
    "ownerID": 12,
    "price": 550000
  },
  {
    "cattleID": 3,
    "birthDate": "2022-03-01",
    "gender": "Male",
    "weight": 600,
    "vaccinationRecord": [{ "vaccineName": "lmn", "date": "2021-03-02" }, { "vaccineName": "pqr", "date": "2021-03-05" }],
    "parentCattleID": { "mom": 135, "dad": 35 },
    "survivalStatus": "Alive",
    "ownerID": 13,
    "price": 50000000
  },
  {
    "cattleID": 4,
    "birthDate": "2022-04-01",
    "gender": "Female",
    "weight": 520,
    "vaccinationRecord": [{ "vaccineName": "ijk", "date": "2021-04-02" }, { "vaccineName": "uvw", "date": "2021-04-05" }],
    "parentCattleID": { "mom": 140, "dad": 40 },
    "survivalStatus": "Dead",
    "ownerID": 14,
    "price": 520000
  },
  {
    "cattleID": 5,
    "birthDate": "2022-05-01",
    "gender": "Male",
    "weight": 580,
    "vaccinationRecord": [{ "vaccineName": "def", "date": "2021-05-02" }, { "vaccineName": "ghi", "date": "2021-05-05" }, { "vaccineName": "ghiewe", "date": "2021-05-07" }, { "vaccineName": "ghiewe", "date": "2021-05-07" }],
    "parentCattleID": { "mom": 145, "dad": 45 },
    "survivalStatus": "Alive",
    "ownerID": 15,
    "price": 580000
  },
  {
    "cattleID": 6,
    "birthDate": "2022-06-01",
    "gender": "Female",
    "weight": 530,
    "vaccinationRecord": [{ "vaccineName": "rst", "date": "2021-06-02" }, { "vaccineName": "opq", "date": "2021-06-05" }],
    "parentCattleID": { "mom": 150, "dad": 50 },
    "survivalStatus": "Alive",
    "ownerID": 16,
    "price": 530000
  },
  {
    "cattleID": 7,
    "birthDate": "2022-07-01",
    "gender": "Male",
    "weight": 620,
    "vaccinationRecord": [{ "vaccineName": "xyz", "date": "2021-07-02" }, { "vaccineName": "uvw", "date": "2021-07-05" }],
    "parentCattleID": { "mom": 155, "dad": 55 },
    "survivalStatus": "Alive",
    "ownerID": 17,
    "price": 620000
  },
  {
    "cattleID": 8,
    "birthDate": "2022-08-01",
    "gender": "Female",
    "weight": 540,
    "vaccinationRecord": [{ "vaccineName": "opq", "date": "2021-08-02" }, { "vaccineName": "rst", "date": "2021-08-05" }],
    "parentCattleID": { "mom": 160, "dad": 60 },
    "survivalStatus": "Alive",
    "ownerID": 18,
    "price": 540000
  },
  {
    "cattleID": 9,
    "birthDate": "2022-09-01",
    "gender": "Male",
    "weight": 560,
    "vaccinationRecord": [{ "vaccineName": "uvw", "date": "2021-09-02" }, { "vaccineName": "rst", "date": "2021-09-05" }],
    "parentCattleID": { "mom": 165, "dad": 65 },
    "survivalStatus": "Dead",
    "ownerID": 19,
    "price": 560000
  },
  {
    "cattleID": 10,
    "birthDate": "2022-10-01",
    "gender": "Female",
    "weight": 570,
    "vaccinationRecord": [{ "vaccineName": "ghi", "date": "2021-10-02" }, { "vaccineName": "def", "date": "2021-10-05" }],
    "parentCattleID": { "mom": 170, "dad": 70 },
    "survivalStatus": "Alive",
    "ownerID": 20,
    "price": 570000
  }
]


const ForSaleCattleListPage = () => {
  return (
    <MainBackground>
      <MainTitleStyle>
        <MainTitle>판매중인 가축 목록</MainTitle>
      </MainTitleStyle>
      <div>
        {cattleData.map((cattle) => (
          <CattleCardBar key={cattle.cattleID} cattle={cattle} />
        ))}
      </div>
    </MainBackground>
  )
}

export default ForSaleCattleListPage