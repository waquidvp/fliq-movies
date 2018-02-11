import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import screenConstants from './utils/screenConstants';
import MainStackNavigator from './Navigators/MainStackNavigator';

const MainContainer = styled.View`
  flex: 1;
  background-color: #ecf0f1;
`;

export default class App extends Component {
  render() {
    return (
      <MainContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ced2d27f"
          translucent
        />
        <MainStackNavigator />
      </MainContainer>
    );
  }
}
