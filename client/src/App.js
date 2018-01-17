import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import MainTabNavigator from './Navigators/MainTabNavigator';

const MainContainer = styled.View`
  flex: 1;
  background-color: #ecf0f1;
  padding-top: 16;
`;

export default class App extends Component {
  render() {
    return (
      <MainContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ced2d2" />
        <MainTabNavigator />
      </MainContainer>
    );
  }
}
