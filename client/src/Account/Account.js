import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import TabIcon from '../components/TabIcon';
import AccountTabNavigator from './AccountTabNavigator';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { signout } from '../state/actions/auth';

const MainContainer = styled.View`
  flex: 1;
`;

const Profile = styled.View`
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
`;

// const ProfilePicture = styled.Image`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
// `;

const AccountName = styled.Text`
  padding-left: 16px;
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

const ButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
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
    const { signOut, user } = this.props;
    const { mainNavigation } = this.props.screenProps;

    return (
      <MainContainer>
        <Header
          title="Your Account"
          rightIconSource={require('../assets/icons/Settings.png')}
          rightIconOnPress={() => mainNavigation.navigate('Preferences')}
        />
        <Profile>
          {/* <ProfilePicture
            source={{
              uri:
                'https://avatars1.githubusercontent.com/u/15846228?s=460&v=4',
            }}
          /> */}
          <Icon
            source={require('../assets/icons/Account.png')}
            style={{ height: 30, width: 30 }}
          />
          <AccountName>{user.name}</AccountName>
          <ButtonContainer>
            <Button title="Sign Out" onPress={() => signOut()} />
          </ButtonContainer>
        </Profile>
        <AccountTabNavigator
          screenProps={{
            mainNavigation,
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
