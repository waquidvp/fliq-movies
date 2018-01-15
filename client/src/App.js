import React, { Component } from 'react';
import styled from 'styled-components/native';

import HomeTabNavigator from './Home/HomeTabNavigator';

const MainContainer = styled.View`
  flex: 1;
`;

export default class App extends Component {
  render() {
    return (
      <MainContainer>
        <HomeTabNavigator />
      </MainContainer>
    );
  }
}
