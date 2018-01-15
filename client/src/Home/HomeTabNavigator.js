import { TabNavigator, TabBarBottom } from 'react-navigation';

import Home from './Home';
import Search from './Search';
import Watchlist from './Watchlist';
import Account from './Account';

const HomeTabNavigator = TabNavigator(
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
    animationEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#FFFFFF00',
        borderTopWidth: 0,
        paddingRight: 16,
        paddingLeft: 16,
      },
    },
    swipeEnabled: false,
  },
);

export default HomeTabNavigator;
