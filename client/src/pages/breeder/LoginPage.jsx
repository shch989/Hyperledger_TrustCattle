import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import SignIn from '../../components/breeder/SignIn';
import SignUp from '../../components/breeder/SignUp';
import Background from '../../components/UI/Background';

const ContentContainer = styled.div`
  padding: 20px;
`;

const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState('signup');

  return (
    <Background>
      <ContentContainer>
        {selectedTab === 'login' && <SignIn />}
        {selectedTab === 'signup' && <SignUp />}
      </ContentContainer>
    </Background>
  );
};

export default LoginPage;