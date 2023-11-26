import React from 'react'
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin: 0 0 24px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.38;
  letter-spacing: -.2px;
  color: #111;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 16px 24px 14px;
  margin: 0;
  color: #111;
  font-size: 16px;
  box-sizing: border-box;
  border: solid 1px #ddd;
  background-color: #fff;
  border-radius: 4px;

  /* 숫자 입력일 때 화살표 제거 */
  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    appearance: textfield; /* Standard property */
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Input = (props) => {
  return (
    <InputWrapper>
      <InputLabel>{props.label}</InputLabel>
      <InputField
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required
      />
    </InputWrapper>
  )
}

export default Input