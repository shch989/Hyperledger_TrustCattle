import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

const MainPage = () => {
  return (
    <ButtonContainer>
      <ButtonLink to="/login">사육자 로그인</ButtonLink>
      <ButtonLink to="/edit-profile/:userId">사육자 정보 수정</ButtonLink>
      <ButtonLink to="/registerCattle">가축 등록</ButtonLink>
      <ButtonLink to="/edit-cattle/:cattleId">가축 정보 수정</ButtonLink>
      <ButtonLink to="/cattle-list/:userId">사육자 가축 목록</ButtonLink>
      <ButtonLink to="/sale-cattle-list">판매 가축 목록</ButtonLink>
      <ButtonLink to="/sell-request/:cattleId">가축 판매 신청</ButtonLink>
      <ButtonLink to="/buy-request/:cattleId">가축 구매 요청</ButtonLink>
      <ButtonLink to="/transaction-complete">거래 완료</ButtonLink>
    </ButtonContainer>
  );
};

export default MainPage;