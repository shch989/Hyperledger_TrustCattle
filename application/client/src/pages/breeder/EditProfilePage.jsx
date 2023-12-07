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
`;

const EditCattleInfoPage = () => {
  const [userName, setUserName] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const [farmAddress, setFarmAddress] = useState('');

  const handleAdminSubmit = async (event) => {
    event.preventDefault();

    alert(`수정되었습니다.`);
    console.log(userName)
    console.log(userNumber)
    console.log(userEmail)
    console.log(farmAddress)

    setUserName('')
    setUserNumber('')
    setUserEmail('')
    setFarmAddress('')
  };

  return (
    <MainBackground>
      <InputBoxStyle>
        <PageTitle>가축 정보 수정</PageTitle>
        <form onSubmit={handleAdminSubmit}>
          <Input
            label="이름"
            type="text"
            id="username"
            value={userName}
            placeholder="이름"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            label="전화번호"
            type="number"
            id="usernumber"
            value={userNumber}
            placeholder="전화번호 (예: 010-1234-5678)"
            onChange={(e) => setUserNumber(e.target.value)}
          />
          <Input
            label="이메일"
            type="text"
            id="useremail"
            value={userEmail}
            placeholder="이메일"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Input
            label="농장 주소"
            type="text"
            id="farmaddress"
            value={farmAddress}
            placeholder="농장 주소 (최대한 상세히)"
            onChange={(e) => setFarmAddress(e.target.value)}
          />
          <Button type="submit">등록하기</Button>
        </form>
      </InputBoxStyle>
    </MainBackground>
  );
};

export default EditCattleInfoPage;