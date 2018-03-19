import React from 'react';
import styled from 'styled-components/native';

import MovieIcon from '../../components/MovieIcon';

const MainContainer = styled.View`
  flex: 2;
  padding-top: 24px;
  align-items: center;
  justify-content: center;
`;

const BannerText = styled.Text`
  font-size: 22px;
  color: black;
  font-weight: bold;
`;

const Banner = () => (
  <MainContainer>
    <MovieIcon />
  </MainContainer>
);

export default Banner;
