import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import TabIcon from '../components/TabIcon';
import SearchBar from './components/SearchBar';
import Icon from '../components/Icon';
import { search } from '../api/search';
import { getGenre } from '../api/genres';
import MovieListItem from '../components/MovieListItem';
import IconButton from '../components/IconButton';

const MainContainer = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.View`
  flex: 1;
`;

const SearchList = styled.FlatList`
  flex: 1;
`;

const ListSpacer = styled.View`
  height: 16px;
`;

const styles = StyleSheet.create({
  fuzzyOverlayTop: {
    height: 10,
    width: '100%',
    position: 'absolute',
    top: 0,
    elevation: 5,
    zIndex: 5,
  },
  fuzzyOverlayBottom: {
    height: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    zIndex: 5,
  },
});

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: config => (
      <TabIcon config={config} source={require('../assets/icons/Search.png')} />
    ),
  };

  state = {
    searchTerm: '',
    searchResults: [],
    loading: false,
  };

  search = searchTerm => {
    if (searchTerm !== '') {
      this.setState({ loading: true });
      search(searchTerm, searchResults => {
        this.setState({
          searchTerm,
          searchResults: searchResults.results,
          loading: false,
        });
      });
    }
  };

  clear = () => this.setState({ searchResults: [], searchTerm: '' });

  keyExtractor = item => item.id;

  render() {
    const { searchTerm, searchResults, loading } = this.state;
    const { mainNavigation } = this.props.screenProps;

    return (
      <MainContainer>
        <SearchBar search={this.search} clear={this.clear} />
        <ListContainer>
          <LinearGradient
            colors={['#ecf0f1', '#ecf0f100']}
            style={styles.fuzzyOverlayTop}
          />
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" />
            </LoadingContainer>
          ) : (
            <SearchList
              data={searchResults}
              renderItem={({ item }) => (
                <MovieListItem
                  movie={item}
                  onPress={() =>
                    mainNavigation.navigate('MovieDetail', { movie: item })
                  }
                  RightIcon={
                    <IconButton source={require('../assets/icons/Add.png')} />
                  }
                />
              )}
              ListHeaderComponent={() => <ListSpacer />}
              ListFooterComponent={() => <ListSpacer />}
              keyExtractor={this.keyExtractor}
            />
          )}
          <LinearGradient
            colors={['#ecf0f100', '#ecf0f1']}
            style={styles.fuzzyOverlayBottom}
          />
        </ListContainer>
      </MainContainer>
    );
  }
}

export default Search;
