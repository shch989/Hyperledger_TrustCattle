import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 15px;
  margin: 20px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.isAlive ? 'transparent' : 'rgba(0, 0, 0, 0.2)'};
`;

const CattleCard = (props) => {
  const { cattleID, birthDate, gender, weight, vaccinationRecord, parentCattleID, survivalStatus, ownerID } = props.cattle;

  const mom = parentCattleID ? parentCattleID.mom : 'N/A';
  const dad = parentCattleID ? parentCattleID.dad : 'N/A';
  const vaccination = vaccinationRecord && vaccinationRecord.length > 0
    ? vaccinationRecord.length === 1
      ? vaccinationRecord[0].vaccineName
      : vaccinationRecord[0].vaccineName + "..."
    : 'No vaccination record';

  const isAlive = survivalStatus === 'Alive';

  return (
    <StyledCard isAlive={isAlive}>
      <h2>가축 ID: {cattleID}</h2>
      <p>출생일: {birthDate}</p>
      <p>성별: {gender}</p>
      <p>체중: {weight}kg</p>
      <p>접종기록: {vaccination}</p>
      <p>부모개체 ID: ( Male: {dad}, Female: {mom} )</p>
      <p>생사여부: {survivalStatus}</p>
      <p>사육자 ID: {ownerID}</p>
    </StyledCard>
  );
}

export default CattleCard;