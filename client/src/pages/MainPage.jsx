import React, { Fragment } from 'react';
// components
import MainBackground from '../components/UI/MainBackground';
import MainImage from '../components/common/Main/MainImage';
import MainRegisterCattle from '../components/common/Main/MainRegisterCattle';

const MainPage = () => {

  return (
    <Fragment>
      <MainBackground>
        <MainImage />
        <MainRegisterCattle/>
      </MainBackground>
    </Fragment>
  );
};

export default MainPage;