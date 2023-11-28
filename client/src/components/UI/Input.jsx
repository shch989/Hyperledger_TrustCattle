// Input.js

import React from 'react';
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

const DateInputField = styled.input`
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
  &[type="date"]::-webkit-inner-spin-button {
    display: none;
  }

  &[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 1;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 16px 24px 14px;
  margin: 0;
  color: #111;
  font-size: 16px;
  box-sizing: border-box;
  border: solid 1px #ddd;
  background-color: #fff;
  border-radius: 4px;
  appearance: none;
  text-align-last: left;
  padding-right: 25px; 
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23000000"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
`;

const Input = (props) => {
  const { type, label, value, onChange, placeholder, options } = props;

  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      {type === 'date' ? (
        <DateInputField
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === 'select' ? (
        <SelectInput value={value} onChange={onChange}>
          <option value="" disabled hidden>
            선택하세요
          </option>
          {Option &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </SelectInput>
      ) : (
        <InputField
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </InputWrapper>
  );
};

export default Input;