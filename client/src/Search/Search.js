import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import TabIcon from '../components/TabIcon';
import SearchBar from './components/SearchBar';
import { search } from '../api/search';
import MovieListItem from '../components/MovieListItem';
import IconButton from '../components/IconButton';
import Loading from '../components/Loading';

import { addMovie, removeMovie } from '../state/actions/watchlist';

const MainContainer = styled.View`
  flex: 1;
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
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Search',
    tabBarIcon: config => (
      <TabIcon config={config} source={require('../assets/icons/Search.png')} />
    ),
    tabBarOnPress: ({ scene, jumpToIndex }) => {
      const { params } = navigation.state;

      jumpToIndex(scene.index);
      if (params) params.focusSearchBar();
    },
  });

  state = {
    searchTerm: '',
    searchResults: [],
    loading: false,
  };

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      focusSearchBar: this.focusSearchBar,
    });

    this.focusSearchBar();
  }

  focusSearchBar = () => {
    this.searchInput.input.focus();
  };

  search = (searchTerm) => {
    const { watchlist } = this.props;

    if (searchTerm !== '') {
      this.setState({ loading: true });
      search(searchTerm, (searchResults) => {
        let searchResultsList = searchResults.results;

        searchResultsList = searchResultsList.map((movie) => {
          const inWatchlist = watchlist.find(watchlistMovie => watchlistMovie.movie.id === movie.id,);

          if (inWatchlist) {
            return {
              movie,
              inWatchlist: true,
              watched: inWatchlist.watched,
            };
          }

          return {
            movie,
            inWatchlist: false,
            watched: false,
          };
        });

        this.setState({
          searchTerm,
          searchResults: searchResultsList,
          loading: false,
        });
      });
    }
  };

  clear = () => this.setState({ searchResults: [], searchTerm: '' });

  keyExtractor = item => item.id;

  handleTickPress = (item, index) => {
    this.props.removeMovie(item.movie.id);

    const newState = this.state.searchResults;
    newState[index] = {
      ...newState[index],
      inWatchlist: false,
    };

    this.setState({
      searchResults: newState,
    });
  };

  handleAddPress = (item, index) => {
    this.props.addMovie(item.movie);

    const newState = this.state.searchResults;
    newState[index] = {
      ...newState[index],
      inWatchlist: true,
    };

    this.setState({
      searchResults: newState,
    });
  };

  render() {
    const { searchTerm, searchResults, loading } = this.state;
    const { mainNavigation } = this.props.screenProps;

    return (
      <MainContainer>
        <SearchBar
          search={this.search}
          clear={this.clear}
          ref={(searchInput) => {
            this.searchInput = searchInput;
          }}
        />
        <ListContainer>
          <LinearGradient
            colors={['#fafafa', '#fafafa00']}
            style={styles.fuzzyOverlayTop}
          />
          {loading ? (
            <Loading />
          ) : (
            <SearchList
              data={searchResults}
              renderItem={({ item, index }) => (
                <MovieListItem
                  movie={item.movie}
                  onPress={() =>
                    mainNavigation.navigate('MovieDetail', {
                      movie: item.movie,
                    })
                  }
                  RightIcon={
                    item.inWatchlist && !item.watched ? (
                      <IconButton
                        source={require('../assets/icons/Tick.png')}
                        onPress={() => this.handleTickPress(item, index)}
                      />
                    ) : (
                      <IconButton
                        source={require('../assets/icons/Add.png')}
                        onPress={() => this.handleAddPress(item, index)}
                      />
                    )
                  }
                />
              )}
              ListHeaderComponent={() => <ListSpacer />}
              ListFooterComponent={() => <ListSpacer />}
              keyExtractor={this.keyExtractor}
            />
          )}
          <LinearGradient
            colors={['#fafafa00', '#fafafa']}
            style={styles.fuzzyOverlayBottom}
          />
        </ListContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.watchlist,
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  addMovie: movie => dispatch(addMovie(movie)),
  removeMovie: id => dispatch(removeMovie(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
