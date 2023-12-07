import React from 'react'
import styled from 'styled-components';
// image
import TitleImage from '../../../public/images/main_picture.jpg'

const MainImageStyle = styled.img`
  width: 100%;
  margin: 20px 0;
`

const MainImage = () => {
  return (
    <MainImageStyle src={TitleImage} alt="메인" />
  )
}

export default MainImage