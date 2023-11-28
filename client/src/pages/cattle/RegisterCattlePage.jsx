import React, { useState } from 'react';
import styled from 'styled-components';
import MainBackground from '../../components/UI/MainBackground';
import PageTitle from '../../components/UI/PageTitle';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import ParentCattleInfo from '../../components/cattle/ParentCattleInfo';

const InputBoxStyle = styled.div`
  width: 60%;
  margin: 0 auto 30px auto;
  padding: 20px 0;
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

const RegisterCattlePage = () => {
  const [cattleId, setCattleId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [addedVaccinationHistory, setAddedVaccinationHistory] = useState([]);
  const [newVaccine, setNewVaccine] = useState({ vaccineName: '', date: '' });
  const [parentCattle, setParentCattle] = useState({ male: '', female: '' });

  const options = [
    { value: 'male', label: '수컷' },
    { value: 'female', label: '암컷' },
  ];

  const handleCattleSubmit = async (event) => {
    event.preventDefault();

    const parentCattleInfo = {
      male: parentCattle.male.trim() === '' ? 'Unknown' : parentCattle.male.trim(),
      female: parentCattle.female.trim() === '' ? 'Unknown' : parentCattle.female.trim(),
    };

    alert(`등록되었습니다.`);
    console.log(cattleId)
    console.log(birthDate)
    console.log(gender)
    console.log(weight)
    console.log(addedVaccinationHistory)
    console.log(parentCattleInfo)


    setCattleId('');
    setBirthDate('');
    setGender('');
    setWeight('');
    setAddedVaccinationHistory([]);
    setParentCattle({ male: '', female: '' });
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
        <PageTitle>접종 이력</PageTitle>
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

        <PageTitle>가축 정보</PageTitle>
        <form onSubmit={handleCattleSubmit}>
          <Input
            label="가축 아이디"
            type="text"
            value={cattleId}
            placeholder="가축 아이디"
            onChange={(e) => setCattleId(e.target.value)}
          />
          <Input
            label="출생일"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            label="성별"
            type="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={options}
          />
          <Input
            label="체중(Kg)"
            type="number"
            value={weight}
            placeholder="가축 체중(단위 생략)"
            onChange={(e) => setWeight(e.target.value)}
          />

          <PageTitle>부모 개체 정보</PageTitle>
          <ParentCattleInfo parentCattle={parentCattle} onParentCattleChange={setParentCattle} />

          <Button type="submit">등록하기</Button>
        </form>
      </InputBoxStyle>
    </MainBackground>
  );
};

export default RegisterCattlePage;