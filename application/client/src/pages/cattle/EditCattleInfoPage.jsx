import React, { useState } from 'react';
import styled from 'styled-components';
import MainBackground from '../../components/UI/MainBackground';
import PageTitle from '../../components/UI/PageTitle';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const InputBoxStyle = styled.div`
  width: 60%;
  margin: 0 auto 30px auto;
  padding: 20px 0;
  text-align: center;
`;

const VaccinationBox = styled.div`
  margin: 30px 0;
`;

const StyledButton = styled.button`
  width: 40px;
  font-size: 12px;
  height: 25px;
  margin-left: 10px;
`;

const EditCattleInfoPage = () => {
  const [weight, setWeight] = useState('');
  const [addedVaccinationHistory, setAddedVaccinationHistory] = useState([]);
  const [newVaccine, setNewVaccine] = useState({ vaccineName: '', date: '' });

  const handleCattleSubmit = async (event) => {
    event.preventDefault();

    alert(`등록되었습니다.`);
    console.log(weight)
    console.log(addedVaccinationHistory)

    setWeight('');
    setAddedVaccinationHistory([]);
  };

  const handleAddVaccination = () => {
    setAddedVaccinationHistory([...addedVaccinationHistory, newVaccine]);
    setNewVaccine({ vaccineName: '', date: '' });
  };

  const handleRemoveVaccination = (index) => {
    const updatedVaccinationHistory = [...addedVaccinationHistory];
    updatedVaccinationHistory.splice(index, 1);
    setAddedVaccinationHistory(updatedVaccinationHistory);
  };

  return (
    <MainBackground>
      <InputBoxStyle>
        <form onSubmit={handleCattleSubmit}>
          <PageTitle>접종 이력 추가</PageTitle>
          <VaccinationBox>
            <ul>
              {addedVaccinationHistory.map((vaccine, index) => (
                <li key={index}>
                  <strong>백신 이름:</strong> {vaccine.vaccineName}, <strong>접종 일자:</strong> {vaccine.date}
                  <StyledButton type="button" onClick={() => handleRemoveVaccination(index)}>
                    삭제
                  </StyledButton>
                </li>
              ))}
            </ul>
          </VaccinationBox>
          <Input
            label="백신 이름"
            type="text"
            value={newVaccine.vaccineName}
            placeholder="백신 일련번호"
            onChange={(e) => setNewVaccine({ ...newVaccine, vaccineName: e.target.value })}
          />
          <Input
            label="접종 일자"
            type="date"
            value={newVaccine.date}
            onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
          />
          <Button type="button" onClick={handleAddVaccination}>
            백신 추가
          </Button>
          <PageTitle>가축 정보 수정</PageTitle>

          <Input
            label="체중(Kg)"
            type="number"
            value={weight}
            placeholder="가축 체중(단위 생략)"
            onChange={(e) => setWeight(e.target.value)}
          />
          <Button type="submit">등록하기</Button>
        </form>
      </InputBoxStyle>
    </MainBackground>
  );
};

export default EditCattleInfoPage;