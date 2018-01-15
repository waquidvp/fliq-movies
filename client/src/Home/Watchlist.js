import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from './components/TabIcon';

const MainContainer = styled.View`
  flex: 1;
`;

class Watchlist extends Component {
  static navigationOptions = {
    tabBarLabel: 'Watchlist',
    tabBarIcon: ({ focused }) => (
      <TabIcon
        focused={focused}
        source={require('../assets/icons/Watchlist.png')}
      />
    ),
  };

  state = {};
  render() {
    return <MainContainer />;
  }
}

export default Watchlist;
