import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MovieDetail from '../MovieDetail/MovieDetail';

const MainStackNavigator = StackNavigator(
  {
    MainTabNavigator: {
      screen: MainTabNavigator,
    },
    MovieDetail: {
      screen: MovieDetail,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    cardStyle: {
      backgroundColor: '#ecf0f1',
    },
  },
);

export default MainStackNavigator;
