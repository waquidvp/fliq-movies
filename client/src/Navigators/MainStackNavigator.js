import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MovieDetail from '../MovieDetail/MovieDetail';
import Preferences from '../Onboarding/Preferences';

const MainStackNavigator = StackNavigator(
  {
    MainTabNavigator: {
      screen: MainTabNavigator,
    },
    MovieDetail: {
      screen: MovieDetail,
    },
    Preferences: {
      screen: Preferences,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    initialRouteName: 'MainTabNavigator',
    cardStyle: {
      backgroundColor: '#fafafa',
    },
  },
);

export default MainStackNavigator;
