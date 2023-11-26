import React, { Fragment } from 'react'
import styled from 'styled-components';
import CattleCard from '../../cattle/CattleCard';
import MainTitle from './MainTitle';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 1000px; 
  overflow: auto; 
`;

const cattleData = [
  {
    "cattleID": 1,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 500,
    "vaccinationRecord": ["Vaccination1", "Vaccination2"],
    "parentCattleID": { "mom": 125, "dad": 25 },
    "survivalStatus": "Alive",
    "ownerID": 1
  },
  {
    "cattleID": 2,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 550,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 130, "dad": 30 },
    "survivalStatus": "Alive",
    "ownerID": 2
  },
  {
    "cattleID": 3,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 600,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 135, "dad": 35 },
    "survivalStatus": "Alive",
    "ownerID": 3
  },
  {
    "cattleID": 4,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 650,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 140, "dad": 40 },
    "survivalStatus": "Deceased",
    "ownerID": 4
  },
  {
    "cattleID": 5,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 700,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 145, "dad": 45 },
    "survivalStatus": "Alive",
    "ownerID": 0
  },
  {
    "cattleID": 6,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 750,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 150, "dad": 50 },
    "survivalStatus": "Alive",
    "ownerID": 1
  },
  {
    "cattleID": 7,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 800,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 155, "dad": 55 },
    "survivalStatus": "Alive",
    "ownerID": 2
  },
  {
    "cattleID": 8,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 850,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 160, "dad": 60 },
    "survivalStatus": "Alive",
    "ownerID": 3
  },
  {
    "cattleID": 9,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 900,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 165, "dad": 65 },
    "survivalStatus": "Deceased",
    "ownerID": 4
  },
  {
    "cattleID": 10,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 950,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 170, "dad": 70 },
    "survivalStatus": "Alive",
    "ownerID": 0
  },
  {
    "cattleID": 11,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 1000,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 175, "dad": 75 },
    "survivalStatus": "Alive",
    "ownerID": 1
  },
  {
    "cattleID": 12,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 1050,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 180, "dad": 80 },
    "survivalStatus": "Alive",
    "ownerID": 2
  },
  {
    "cattleID": 13,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 1100,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 185, "dad": 85 },
    "survivalStatus": "Alive",
    "ownerID": 3
  },
  {
    "cattleID": 14,
    "birthDate": "2022-01-01",
    "gender": "Female",
    "weight": 1150,
    "vaccinationRecord": ["Vaccination1", "Vaccination2", "Vaccination3"],
    "parentCattleID": { "mom": 190, "dad": 90 },
    "survivalStatus": "Deceased",
    "ownerID": 4
  },
  {
    "cattleID": 15,
    "birthDate": "2022-01-01",
    "gender": "Male",
    "weight": 1200,
    "vaccinationRecord": ["Vaccination1"],
    "parentCattleID": { "mom": 195, "dad": 95 },
    "survivalStatus": "Alive",
    "ownerID": 0
  }
]

const MainRegisterCattle = () => {
  return (
    <Fragment>
      <MainTitle>판매중인 가축({cattleData.length})</MainTitle>
      <StyledGrid>
        {cattleData.map((cattle) => (
          <CattleCard key={cattle.cattleID} cattle={cattle} />
        ))}
      </StyledGrid>
    </Fragment>
  )
}

export default MainRegisterCattle