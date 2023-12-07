import React from 'react'
import styled from 'styled-components'
import MainBackground from '../components/UI/MainBackground'

const MainText = styled.h1`
  margin-top: 20%;
  font-size: 3rem;
  color: #272727;
  text-align: center;
`

const NotFoundPage = () => {
  return <MainBackground>
    <MainText>404 - 페이지를 찾을 수 없습니다.</MainText>
  </MainBackground>
}

export default NotFoundPage