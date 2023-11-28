// Button.js

import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  height: 52px;
  color: #fff;
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  background-color: #111;

  &:focus {
    outline: none;
  }
`;

const Button = (props) => {
  const { type, children, onClick } = props;

  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;