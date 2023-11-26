import React from 'react'
import styled from 'styled-components';

const BackgroundStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 80px;
  width: 70%;
  max-width: 1200px;
`

const MainBackground = (props) => {
  return (
    <BackgroundStyle>{props.children}</BackgroundStyle>
  )
}

export default MainBackground