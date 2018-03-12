import React from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  padding: 0 16px;
  margin: 8px 0;
`;

const Title = styled.Text`
  padding-left: 8px;
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const Slider = styled.Slider`
  margin: 8px 0;
`;

const MainSlider = ({ name, value }) => (
  <MainContainer>
    <Title>{name}</Title>
    <Slider
      minimumValue={0}
      maximumValue={5}
      step={1}
      minimumTrackTintColor="black"
      maximumTrackTintColor="black"
      thumbTintColor="#455A64"
      value={value}
    />
  </MainContainer>
);

export default MainSlider;
