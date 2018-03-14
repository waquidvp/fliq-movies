import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import TabIcon from '../components/TabIcon';
import Header from '../components/Header';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import MovieListItem from '../components/MovieListItem';
import Button from '../components/Button';

import { addToWatchedList as addToWatchedListAction } from '../state/actions/watchlist';
import Loading from '../components/Loading';
import { getMovieDetails } from '../api/movie';
import { addMovieToCache as addMovieToCacheAction } from '../state/actions/moviesCache';

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const ListContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const List = styled.FlatList`
  flex: 1;
`;

const ListSpacer = styled.View`
  height: 16px;
`;

const ListBottomSpacer = styled.View`
  height: 72px;
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

class Watchlist extends Component {
  static navigationOptions = {
    tabBarLabel: 'Watchlist',
    tabBarIcon: config => (
      <TabIcon
        config={config}
        source={require('../assets/icons/Watchlist.png')}
      />
    ),
  };

  state = {};

  getAllMovieDetails = () => {
    const { watchlist } = this.props;

    this.setState({
      movieDetailsLoading: true,
    });

    const movies = [];

    watchlist.movies.forEach(({ movie_id }) => {
      getMovieDetails(movie_id).then((response) => {
        movies.push(response);
      });
    });

    this.setState({
      movies,
      movieDetailsLoading: false,
    });
  };

  render() {
    const {
      watchlist,
      addToWatchedList,
      moviesCache,
      addMovieToCache,
      navigation,
    } = this.props;
    const { mainNavigation } = this.props.screenProps;

    return (
      <MainContainer>
        <Header title="Your Watch list" />
        <ListContainer>
          <LinearGradient
            colors={['#fafafa', '#fafafa00']}
            style={styles.fuzzyOverlayTop}
          />
          {watchlist.watchlistLoading ? (
            <Loading />
          ) : moviesCache.cacheLoading ? (
            <Loading />
          ) : (
            <List
              data={watchlist.movies}
              renderItem={({ item }) => {
                const inMoviesCache = Object.keys(moviesCache.movies).find((movieKey) => movieKey == item.movie_id,);
                if (inMoviesCache) {
                  return (
                    <MovieListItem
                      movieDetail
                      movie={moviesCache.movies[item.movie_id]}
                      RightIcon={
                        <IconButton
                          source={require('../assets/icons/Tick.png')}
                          onPress={() => addToWatchedList(item.movie_id)}
                        />
                      }
                      onPress={() =>
                        mainNavigation.navigate('MovieDetail', {
                          movie: moviesCache.movies[item.movie_id],
                        })
                      }
                    />
                  );
                }

                addMovieToCache(item.movie_id);

                return null;
              }}
              ListHeaderComponent={() => <ListSpacer />}
              ListFooterComponent={() => <ListBottomSpacer />}
            />
          )}
          <LinearGradient
            colors={['#fafafa00', '#fafafa']}
            style={styles.fuzzyOverlayBottom}
          />
        </ListContainer>
        <Button
          title="Add Movie"
          style={{
            position: 'absolute',
            bottom: 16,
          }}
          big
          elevation={6}
          activeElevation={10}
          onPress={() => navigation.navigate('Search')}
          icon={<Icon source={require('../assets/icons/Add.png')} />}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.watchlist,
  moviesCache: state.moviesCache,
});

const mapDispatchToProps = dispatch => ({
  addToWatchedList: movie_id => dispatch(addToWatchedListAction(movie_id)),
  addMovieToCache: movie_id => dispatch(addMovieToCacheAction(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
