import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from './components/TabIcon';

const MainContainer = styled.View`
  flex: 1;
`;

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabIcon
        focused={focused}
        source={require('../assets/icons/Cards.png')}
      />
    ),
  };

  state = {};
  render() {
    return <MainContainer />;
  }
}

export default Home;
