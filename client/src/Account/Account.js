import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';
import AccountTabNavigator from './AccountTabNavigator';

const MainContainer = styled.View`
  flex: 1;
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
        <SafeAreaView style={{ flex: 1 }} >
          <AccountTabNavigator />
        </SafeAreaView>
      </MainContainer>
    );
  }
}

export default Account;
