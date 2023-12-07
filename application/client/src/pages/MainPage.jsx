import React from 'react';
// components
import MainBackground from '../components/UI/MainBackground';
import MainImage from '../components/common/Main/MainImage';
import MainRegisterCattle from '../components/common/Main/MainRegisterCattle';

const MainPage = () => {

  return (
    <MainBackground>
      <MainImage />
      <MainRegisterCattle />
    </MainBackground>
  );
};

export default MainPage;