import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Home from '../Home/Home';
import Search from '../Search/Search';
import Watchlist from '../Watchlist/Watchlist';
import Account from '../Account/Account';
import TabBarComponent from '../components/TabBarComponent';
import screenConstants from '../utils/screenConstants';

const MainContainer = styled.View`
  flex: 1;
`;

const TabBar = Platform.select({
  ios: TabBarBottom,
  android: TabBarComponent,
});

const InitialTabNavigator = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Search: {
      screen: Search,
    },
    Watchlist: {
      screen: Watchlist,
    },
    Account: {
      screen: Account,
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarComponent: TabBar,
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#FFFFFF00',
        borderTopWidth: 0,
        paddingRight: 16,
        paddingLeft: 16,
      },
      activeTintColor: '#ffffff',
    },
    swipeEnabled: false,
  },
);

export default class MainTabNavigator extends React.Component {
  state = {};

  render() {
    const { navigation } = this.props;

    return (
      <MainContainer
        style={{
          paddingTop: screenConstants.statusBarHeight,
        }}
      >
        <InitialTabNavigator
          screenProps={{
            mainNavigation: navigation,
          }}
        />
      </MainContainer>
    );
  }
}
