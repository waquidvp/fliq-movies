import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';
import HomeTabNavigator from './HomeTabNavigator';

const MainContainer = styled.View`
  flex: 1;
`;

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: config => (
      <TabIcon config={config} source={require('../assets/icons/Cards.png')} />
    ),
  };

  state = {};
  render() {
    return (
      <MainContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <HomeTabNavigator />
        </SafeAreaView>
      </MainContainer>
    );
  }
}

export default Home;
