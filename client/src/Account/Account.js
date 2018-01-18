import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';
import AccountTabNavigator from './AccountTabNavigator';
import Header from '../components/Header';

const MainContainer = styled.View`
  flex: 1;
`;

const Profile = styled.View`
  height: 74px;
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
        <Header title="Your Account" />
        <Profile />
        <AccountTabNavigator />
      </MainContainer>
    );
  }
}

export default Account;
