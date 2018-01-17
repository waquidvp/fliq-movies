import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';

const MainContainer = styled.View`
  flex: 1;
`;

class Watchlist extends Component {
  static navigationOptions = {
    tabBarLabel: 'Watchlist',
    tabBarIcon: config => (
      <TabIcon
        config={config}
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
