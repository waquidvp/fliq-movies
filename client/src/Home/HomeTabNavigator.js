import { TabNavigator, TabBarTop } from 'react-navigation';

import Cards from './Cards';
// import Explore from './Explore';

const HomeTabNavigator = TabNavigator(
  {
    Cards: {
      screen: Cards,
    },
    // Explore: {
    //   screen: Explore,
    // },
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
        height: 40,
        width: 120, // when adding explore tab, change to 240
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
        width: 120,
        height: 35,
      },
      upperCaseLabel: false,
    },
  },
);

export default HomeTabNavigator;
