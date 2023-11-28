import React from 'react';
import styled from 'styled-components';
import Button from '../../components/UI/Button';

const VaccinationBox = styled.div`
  margin: 30px 0;
`;

const StyledButton = styled(Button)`
  width: 40px;
  height: 25px;
  margin-left: 10px;
`;

const VaccinationList = ({ vaccinationHistory, onRemoveVaccination }) => {
  return (
    <VaccinationBox>
      <ul>
        {vaccinationHistory.map((vaccine, index) => (
          <li key={index}>
            <strong>백신 이름:</strong> {vaccine.vaccineName}, <strong>접종 일자:</strong> {vaccine.date}
            <StyledButton type="delete" onClick={() => onRemoveVaccination(index)}>
              삭제
            </StyledButton>
          </li>
        ))}
      </ul>
    </VaccinationBox>
  );
};

export default VaccinationList;