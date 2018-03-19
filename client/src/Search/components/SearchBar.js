import React, { Component } from 'react';
import styled from 'styled-components/native';

import Icon from '../../components/Icon';
import IconButton from '../../components/IconButton';

const MainContainer = styled.View`
  margin-top: 8px;
  height: 40px;
  width: 100%;
  padding-right: 16px;
  padding-left: 8px;
  align-items: center;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  margin-left: 8px;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  padding-vertical: 0px;
  height: 40px;
`;

class SearchBar extends Component {
  state = {
    searchTerm: '',
  };

  render() {
    const { search, clear } = this.props;
    const { searchTerm } = this.state;

    return (
      <MainContainer>
        {searchTerm ? (
          <IconButton
            source={require('../../assets/icons/Close.png')}
            onPress={() => {
              clear();
              this.setState({ searchTerm: '' });
            }}
          />
        ) : (
          <Icon
            source={require('../../assets/icons/Search.png')}
            style={{ marginLeft: 8, marginRight: 8 }}
          />
        )}
        <SearchInput
          placeholder="Search"
          placeholderTextColor="rgba(0, 0, 0, 0.54)"
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ searchTerm: text })}
          value={searchTerm}
          returnKeyType="search"
          onEndEditing={() => search(searchTerm)}
          innerRef={(input) => {
            this.input = input;
          }}
        />
      </MainContainer>
    );
  }
}

export default SearchBar;
