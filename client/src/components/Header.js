import React from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  height: 35px;
  margin-top: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 30px;
  padding-bottom: 2px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const Indicator = styled.View`
  width: 45px;
  height: 3px;
  border-radius: 1.5px;
  background-color: black;
`;

const Header = ({ title }) => (
  <MainContainer>
    <TitleContainer>
      <Title>{title}</Title>
    </TitleContainer>
    <Indicator />
  </MainContainer>
);

export default Header;
