import React, { Fragment, useState } from 'react';
import { styled, createGlobalStyle, StyleSheetManager } from 'styled-components';
import SignIn from '../../components/breeder/SignIn';
import SignUp from '../../components/breeder/SignUp';
import LoginBackground from '../../components/UI/LoginBackground';

const GlobalStyle = createGlobalStyle`
  [isSelected] {
    display: none !important;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;
`;

const TabButton = styled.div`
  padding: 20px;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  width: 50%;
  border-bottom: solid 2px ${({ isSelected }) => (isSelected ? '#111' : '#DDD')};
`;

const ContentContainer = styled.div`
  padding: 20px;
`;

const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState('login');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Fragment>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isSelected'}>
        <GlobalStyle />
        <LoginBackground>
          <TabsContainer>
            <TabButton
              isSelected={selectedTab === 'login'}
              onClick={() => handleTabClick('login')}
            >
              로그인
            </TabButton>
            <TabButton
              isSelected={selectedTab === 'signup'}
              onClick={() => handleTabClick('signup')}
            >
              회원가입
            </TabButton>
          </TabsContainer>
          <ContentContainer>
            {selectedTab === 'login' && <SignIn />}
            {selectedTab === 'signup' && <SignUp />}
          </ContentContainer>
        </LoginBackground>
      </StyleSheetManager>
    </Fragment>
  );
};

export default LoginPage;