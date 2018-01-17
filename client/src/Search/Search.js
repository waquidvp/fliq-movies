import React, { Component } from 'react';
import styled from 'styled-components/native';

import TabIcon from '../components/TabIcon';
import SearchBar from './components/SearchBar';

const MainContainer = styled.View`
  flex: 1;
`;

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: config => (
      <TabIcon config={config} source={require('../assets/icons/Search.png')} />
    ),
  };

  state = {};
  render() {
    return (
      <MainContainer>
        <SearchBar />
      </MainContainer>
    );
  }
}

export default Search;
