import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import MovieListItem from '../components/MovieListItem';
import { addMovieToCache as addMovieToCacheAction } from '../state/actions/moviesCache';
import Loading from '../components/Loading';

const MainContainer = styled.View`
  flex: 1;
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

class WatchedList extends Component {
  state = {};
  render() {
    const { watchlist, moviesCache, addMovieToCache } = this.props;
    const { mainNavigation } = this.props.screenProps;

    return (
      <MainContainer>
        <ListContainer>
          <LinearGradient
            colors={['#fafafa', '#fafafa00']}
            style={styles.fuzzyOverlayTop}
          />
          {watchlist.watchedListLoading ? (
            <Loading />
          ) : moviesCache.cacheLoading ? (
            <Loading />
          ) : (
            <List
              data={watchlist.watchedList}
              renderItem={({ item }) => {
                const inMoviesCache = Object.keys(moviesCache.movies).find(movieKey => movieKey == item.movie_id,);
                if (inMoviesCache) {
                  return (
                    <MovieListItem
                      movieDetail
                      movie={moviesCache.movies[item.movie_id]}
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
              ListFooterComponent={() => <ListSpacer />}
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
  moviesCache: state.moviesCache,
});

const mapDispatchToProps = dispatch => ({
  addMovieToCache: movie_id => dispatch(addMovieToCacheAction(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchedList);
