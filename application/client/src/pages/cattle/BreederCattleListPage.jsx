import React from 'react'
import styled from 'styled-components';
import MainTitle from '../../components/common/Main/MainTitle';
import MainBackground from '../../components/UI/MainBackground';
import UserCattleCard from '../../components/breeder/UserCattleCard';
// import { useParams } from 'react-router-dom';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 1000px; 
  overflow: auto; 
`;

const MainTitleStyle = styled.div`
  margin-top: 20px;
`

const cattleData = [
  {
    "cattleID": 1,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 500,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 125, "dad": 25 },
    "survivalStatus": "Alive",
    "ownerID": 1
  },
  {
    "cattleID": 2,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 550,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 130, "dad": 30 },
    "survivalStatus": "Alive",
    "ownerID": 2
  },
  {
    "cattleID": 3,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 600,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 135, "dad": 35 },
    "survivalStatus": "Alive",
    "ownerID": 3
  },
  {
    "cattleID": 4,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 650,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 140, "dad": 40 },
    "survivalStatus": "Deceased",
    "ownerID": 4
  },
  {
    "cattleID": 5,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 700,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 145, "dad": 45 },
    "survivalStatus": "Alive",
    "ownerID": 0
  },
  {
    "cattleID": 6,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 750,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 150, "dad": 50 },
    "survivalStatus": "Alive",
    "ownerID": 1
  },
  {
    "cattleID": 7,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 800,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 155, "dad": 55 },
    "survivalStatus": "Alive",
    "ownerID": 2
  },
  {
    "cattleID": 8,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 850,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 160, "dad": 60 },
    "survivalStatus": "Alive",
    "ownerID": 3
  },
  {
    "cattleID": 9,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 900,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 165, "dad": 65 },
    "survivalStatus": "Deceased",
    "ownerID": 4
  },
  {
    "cattleID": 10,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 950,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 170, "dad": 70 },
    "survivalStatus": "Alive",
    "ownerID": 0
  },
  {
    "cattleID": 11,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 1000,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 175, "dad": 75 },
    "survivalStatus": "Alive",
    "ownerID": 1
  },
  {
    "cattleID": 12,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 1050,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 180, "dad": 80 },
    "survivalStatus": "Alive",
    "ownerID": 2
  },
  {
    "cattleID": 13,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 1100,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 185, "dad": 85 },
    "survivalStatus": "Alive",
    "ownerID": 3
  },
  {
    "cattleID": 14,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 1150,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 190, "dad": 90 },
    "survivalStatus": "Deceased",
    "ownerID": 4
  },
  {
    "cattleID": 15,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 1200,
    "vaccinationRecord": [{ vaccineName: "qwe", date: "2021-01-02" }, { vaccineName: "qwees", date: "2021-01-05" }],
    "parentCattleID": { "mom": 195, "dad": 95 },
    "survivalStatus": "Alive",
    "ownerID": 0
  }
]

const MainRegisterCattle = () => {
  return (
    <MainBackground>
      <MainTitleStyle>
        <MainTitle>사육 중인 가축 리스트({cattleData.length})</MainTitle>
      </MainTitleStyle>
      <StyledGrid>
        {cattleData.map((cattle) => (
          <UserCattleCard key={cattle.cattleID} cattle={cattle} />
        ))}
      </StyledGrid>
    </MainBackground>
  )
}

export default MainRegisterCattle