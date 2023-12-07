import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
// Common
import Navbar from '../common/NavBar/NavBar';
import Footer from '../common/Footer/Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 100% 높이 설정 */
`;

const FooterStyle = styled.div`
  margin-top: auto; /* 상단 여백을 auto로 설정 */
  height: 300px;
  width: 100%;
  background-color: #F8F8F8;
  align-items: center;
  justify-content: center;
`;

const Layout = (props) => {
  const { pathname } = useLocation();

  if (pathname === '/login') {
    return <main>{props.children}</main>;
  }

  return (
    <LayoutContainer>
      <Navbar />
      {props.children}
      <FooterStyle><Footer /></FooterStyle>
    </LayoutContainer>
  );
};

export default Layout;