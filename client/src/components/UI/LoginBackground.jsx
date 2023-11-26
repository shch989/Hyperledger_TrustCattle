import React from 'react'
import styled from 'styled-components';

const BackgroundStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 520px;
  margin: 0 auto;
  padding-bottom: 60px;
`

const LoginBackground = (props) => {
  return (
    <BackgroundStyle>{props.children}</BackgroundStyle>
  )
}

export default LoginBackground