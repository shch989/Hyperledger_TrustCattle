import React, { useState } from 'react'
import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
import MainBackground from '../../components/UI/MainBackground';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import PageTitle from '../../components/UI/PageTitle';

const InputBoxStyle = styled.div`
  width: 60%;
  margin: 0 auto 30px auto;
  padding: 20px 0;
`;

const SellRequestPage = () => {
  const [price, setPrice] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  // const { cattleId } = useParams();

  const handleCattleSubmit = async (event) => {
    event.preventDefault();

    alert(`등록되었습니다.`);
    console.log(price)

    setPrice('')
    setBankNumber('')
  };

  return (
    <MainBackground>
      <PageTitle>가축 판매 신청</PageTitle>
      <InputBoxStyle>
        <form onSubmit={handleCattleSubmit}>
          <Input
            label="판매 가격"
            type="number"
            value={price}
            placeholder="가축 판매 가격"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="계좌번호"
            type="number"
            value={bankNumber}
            placeholder="계좌번호(부산은행)"
            onChange={(e) => setBankNumber(e.target.value)}
          />
          <Button type="submit">등록하기</Button>
        </form>
      </InputBoxStyle>
    </MainBackground>
  )
}

export default SellRequestPage