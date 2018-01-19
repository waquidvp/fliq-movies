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
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
`;

const ProfilePicture = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const AccountName = styled.Text`
  padding-left: 16px;
  font-size: 16px;
  font-weight: 500;
  color: black;
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
        <Header
          title="Your Account"
          rightIconSource={require('../assets/icons/Settings.png')}
        />
        <Profile>
          <ProfilePicture
            source={{
              uri:
                'https://avatars1.githubusercontent.com/u/15846228?s=460&v=4',
            }}
          />
          <AccountName>Waquid VP</AccountName>
        </Profile>
        <AccountTabNavigator />
      </MainContainer>
    );
  }
}

export default Account;
