import { TabNavigator, TabBarTop } from 'react-navigation';

import Cards from './Cards';
import WhatsHotList from './WhatsHotList';

const HomeTabNavigator = TabNavigator(
  {
    Cards: {
      screen: Cards,
    },
    WhatsHot: {
      screen: WhatsHotList,
    },
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#ffffff00',
        elevation: 0,
        shadowColor: '#ffffff00',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
        height: 35,
        width: 280,
      },
      indicatorStyle: {
        backgroundColor: '#000000',
        height: 3,
        borderRadius: 1.5,
        width: 45,
        alignSelf: 'center',
      },
      labelStyle: {
        color: '#000000',
        fontSize: 14,
        fontWeight: 'bold',
      },
      tabStyle: {
        width: 140,
        height: 30,
      },
      upperCaseLabel: false,
    },
  },
);

export default HomeTabNavigator;
