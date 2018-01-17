import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';
import AccountTabNavigator from './AccountTabNavigator';

const MainContainer = styled.View`
  flex: 1;
  padding-top: 16px;
`;

class Account extends Component {
  static navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon: config => (
      <TabIcon
        config={config}
        source={require('../assets/icons/Account.png')}
      />
    ),
  };

  state = {};
  render() {
    return (
      <MainContainer>
        <AccountTabNavigator />
      </MainContainer>
    );
  }
}

export default Account;
