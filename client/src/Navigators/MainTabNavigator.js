import { TabNavigator, TabBarBottom } from 'react-navigation';

import Home from '../Home/Home';
import Search from '../Search/Search';
import Watchlist from '../Watchlist/Watchlist';
import Account from '../Account/Account';
import Cards from '../Home/Cards';
import TabBarComponent from '../components/TabBarComponent';

const MainTabNavigator = TabNavigator(
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
    tabBarComponent: TabBarComponent,
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

export default MainTabNavigator;
