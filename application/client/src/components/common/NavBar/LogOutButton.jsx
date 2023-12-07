import React from 'react';
import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi';

const Logout = styled.button`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a2a2a2;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 25px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: #000;
  }

  svg {
    margin-left: 5px;
    font-size: 25px;
    font-weight: bold;
  }
`;

const LogOutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = window.location.pathname;
  };

  return (
    <Logout onClick={handleLogout}>
      로그아웃
      <FiLogOut />
    </Logout>
  );
};

export default LogOutButton;