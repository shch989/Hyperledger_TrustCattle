import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const DataItem = styled.div`
  margin-right: 10px;
  flex-direction: row;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

const Button = styled.button`
  width: 80px;
  cursor: pointer;
  ${(props) => props.disabled && 'opacity: 0.5; cursor: not-allowed;'}
`;

const truncateVaccination = (vaccinationRecord) => {
  if (vaccinationRecord.length <= 3) {
    return vaccinationRecord.map((vaccine) => vaccine.vaccineName).join(', ');
  } else {
    const truncatedList = vaccinationRecord.slice(0, 3).map((vaccine) => vaccine.vaccineName).join(', ');
    return `${truncatedList} ...`;
  }
};

const CattleCardBar = ({ cattle, onDetailClick, onRequestClick }) => {
  const { cattleID, birthDate, gender, weight, vaccinationRecord, survivalStatus, price } = cattle;

  return (
    <CardContainer>
      <DataContainer>
        <DataItem>
          <Label>가축ID: {cattleID}</Label>
        </DataItem>
        <DataItem>
          <Label>출생일: {birthDate}</Label>
        </DataItem>
        <DataItem>
          <Label>성별: {gender}</Label>
        </DataItem>
        <DataItem>
          <Label>무게: {weight} Kg</Label>
        </DataItem>
        <DataItem>
          <Label>접종기록: {truncateVaccination(vaccinationRecord)}</Label>
        </DataItem>
        <DataItem>
          <Label>생존여부: {survivalStatus}</Label>
        </DataItem>
        <DataItem>
          <Label>가격: {price} 원</Label>
        </DataItem>
      </DataContainer>

      <div>
        <Button onClick={onDetailClick}>자세히</Button>
      </div>
      <div>
        <Button onClick={onRequestClick} disabled={survivalStatus !== 'Alive'}>
          요청
        </Button>
      </div>
    </CardContainer>
  );
};

export default CattleCardBar;