import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from './components/TabIcon';

const MainContainer = styled.View`
  flex: 1;
`;

class Account extends Component {
  static navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon: ({ focused }) => (
      <TabIcon
        focused={focused}
        source={require('../assets/icons/Account.png')}
      />
    ),
  };

  state = {};
  render() {
    return <MainContainer />;
  }
}

export default Account;
