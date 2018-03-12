import React from 'react';
import styled from 'styled-components/native';

import IconButton from '../components/IconButton';

const MainContainer = styled.View`
  height: 40px;
  margin-top: 8px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InnerHeaderContainer = styled.View`
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

const IconContainer = styled.View`
  position: absolute;
  right: 8px;
`;

const Header = ({ title, rightIconSource, rightIconOnPress }) => (
  <MainContainer>
    <InnerHeaderContainer>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <Indicator />
    </InnerHeaderContainer>
    {rightIconSource ? (
      <IconContainer>
        <IconButton
          source={rightIconSource}
          onPress={() => rightIconOnPress()}
        />
      </IconContainer>
    ) : null}
  </MainContainer>
);

export default Header;
