import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 30px 0;
`;

const TitleText = styled.h1`
  font-weight: bold;
  margin: 10px 0;
`;

const PageTitle = (props) => {
  return (
    <TitleWrapper>
      <TitleText>{props.children}</TitleText>
    </TitleWrapper>
  );
};

export default PageTitle;