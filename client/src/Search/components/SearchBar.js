import React, { Component } from 'react';
import styled from 'styled-components/native';

import Icon from '../../components/Icon';

const MainContainer = styled.View`
  margin-top: 16px;
  height: 35px;
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  align-items: center;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  margin-left: 16px;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  padding-vertical: 0px;
  height: 35px;
`;

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <MainContainer>
        <Icon source={require('../../assets/icons/Search.png')} />
        <SearchInput
          placeholder="Search"
          placeholderTextColor="rgba(0, 0, 0, 0.54)"
          underlineColorAndroid="transparent"
        />
      </MainContainer>
    );
  }
}

export default SearchBar;
