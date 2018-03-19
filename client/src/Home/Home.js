import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';
import HomeTabNavigator from './HomeTabNavigator';

const MainContainer = styled.View`
  flex: 1;
  padding-top: 8px;
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
    const { mainNavigation } = this.props.screenProps;

    return (
      <MainContainer>
        <HomeTabNavigator
          screenProps={{
            mainNavigation,
          }}
        />
      </MainContainer>
    );
  }
}

export default Home;
