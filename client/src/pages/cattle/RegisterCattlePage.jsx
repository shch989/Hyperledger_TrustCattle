import React, { useState } from 'react';
import styled from 'styled-components';
import MainBackground from '../../components/UI/MainBackground';
import PageTitle from '../../components/UI/PageTitle';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import VaccinationList from '../../components/cattle/VaccinationList';
import ParentCattleInfo from '../../components/cattle/ParentCattleInfo';

const InputBoxStyle = styled.div`
  width: 60%;
  margin: 0 auto 30px auto;
  padding: 20px 0;
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

  const handleAdminSubmit = async (event) => {
    event.preventDefault();

    alert(`등록되었습니다.`);
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
        <PageTitle>가축 정보</PageTitle>
        <form onSubmit={handleAdminSubmit}>
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

          <PageTitle>접종 이력</PageTitle>
          <VaccinationList vaccinationHistory={addedVaccinationHistory} onRemoveVaccination={handleRemoveVaccination} />
          <Input
            label="백신 이름"
            type="text"
            value={newVaccine.vaccineName}
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

          <PageTitle>부모 개체 정보</PageTitle>
          <ParentCattleInfo parentCattle={parentCattle} onParentCattleChange={setParentCattle} />

          <Button>등록하기</Button>
        </form>
      </InputBoxStyle>
    </MainBackground>
  );
};

export default RegisterCattlePage;