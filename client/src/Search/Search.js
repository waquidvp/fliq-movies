import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import TabIcon from '../components/TabIcon';
import SearchBar from './components/SearchBar';
import MovieListItem from '../components/MovieListItem';
import IconButton from '../components/IconButton';
import Loading from '../components/Loading';

import {
  addToWatchlist as addToWatchlistAction,
  removeFromWatchlist as removeFromWatchlistAction,
} from '../state/actions/watchlist';
import { getMovieDetails } from '../api/movie';
import { search as searchAction, clearSearch } from '../state/actions/search';

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
    movieLoaders: [],
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
    const { searchApi } = this.props;

    if (searchTerm !== '') {
      searchApi(searchTerm);
    }
  };

  clear = () => {
    const { clearSearch } = this.props;

    clearSearch();
  };

  keyExtractor = item => item.id;

  getExtraMovieDetail = (id, index) => {
    const { mainNavigation } = this.props.screenProps;
    const { movieLoaders } = this.state;

    const newMovieLoaders = [...movieLoaders];
    newMovieLoaders[index] = true;

    this.setState({
      movieLoaders: newMovieLoaders,
    });

    getMovieDetails(id).then((movieDetails) => {
      const nextMovieLoaders = [...movieLoaders];
      nextMovieLoaders[index] = false;

      this.setState({
        movieLoaders: nextMovieLoaders,
      });
      mainNavigation.navigate('MovieDetail', {
        movie: movieDetails,
      });
    });
  };

  render() {
    const { search, addToWatchlist, removeFromWatchlist } = this.props;
    const { movieLoaders } = this.state;

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
          {search.isLoading ? (
            <Loading />
          ) : (
            <SearchList
              data={search.results}
              renderItem={({ item, index }) => (
                <MovieListItem
                  movie={item.movie}
                  onPress={() => this.getExtraMovieDetail(item.movie.id, index)}
                  RightIcon={
                    movieLoaders[index] === true ? (
                      <Loading />
                    ) : item.inWatchlist ? (
                      <IconButton
                        source={require('../assets/icons/Tick.png')}
                        onPress={() => removeFromWatchlist(item.movie.id)}
                      />
                    ) : (
                      <IconButton
                        source={require('../assets/icons/Add.png')}
                        onPress={() => addToWatchlist(item.movie.id)}
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

const getSearchResults = (state) => {
  const { search, watchlist } = state;

  const searchWithWatchlist = search.results.map((movie) => {
    const inWatchlist = watchlist.movies.find(watchlistMovie => watchlistMovie.movie_id === movie.id,);

    if (inWatchlist) {
      return {
        movie,
        inWatchlist: true,
      };
    }

    return {
      movie,
      inWatchlist: false,
    };
  });

  return {
    ...search,
    results: searchWithWatchlist,
  };
};

const mapStateToProps = state => ({
  search: getSearchResults(state),
});

const mapDispatchToProps = dispatch => ({
  searchApi: searchTerm => dispatch(searchAction(searchTerm)),
  clearSearch: () => dispatch(clearSearch()),
  addToWatchlist: movie_id => dispatch(addToWatchlistAction(movie_id)),
  removeFromWatchlist: movie_id =>
    dispatch(removeFromWatchlistAction(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
