import React from 'react'
import styled from 'styled-components';

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  line-height: 1.3;
  letter-spacing: -.3px;
  font-weight: 600;
  color: #111;
  margin-bottom: 20px;
`

const MainTitle = (props) => {
  return (
    <TitleStyle>{props.children}</TitleStyle>
  )
}

export default MainTitle