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

const ListItemContainer = styled.View`
  height: 106px;
  background-color: white;
  margin: 4px 8px;
  border-radius: 15px;
  elevation: 3;
  shadow-color: #000000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.3;
  shadow-radius: 3;
  flex-direction: row;
`;

const MoviePosterContainer = styled.View`
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  overflow: hidden;
`;

const MoviePoster = styled.Image`
  height: 106px;
  width: 72px;
  background-color: #ced2d27f;
`;

const MovieInfoContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  justify-content: center;
  max-width: 66%;
`;

const Title = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const GenreContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Genre = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const Year = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const IconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
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

const MovieSearchItem = ({ movie }) => (
  <ListItemContainer>
    <MoviePosterContainer>
      <MoviePoster
        source={
          movie.poster_path
            ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
            : require('../assets/images/PosterNotAvailable.png')
        }
      />
    </MoviePosterContainer>
    <MovieInfoContainer>
      <Title>{movie.title}</Title>
      <GenreContainer>
        {movie.genre_ids.map((genre_id, index, array) => {
          if (array.length - 1 === index) {
            return <Genre key={genre_id}>{getGenre(genre_id)}</Genre>;
          }

          return <Genre key={genre_id}>{`${getGenre(genre_id)}, `}</Genre>;
        })}
      </GenreContainer>
      <Year>{movie.release_date.substring(0, 4)}</Year>
    </MovieInfoContainer>
    <IconContainer>
      <Icon source={require('../assets/icons/Add.png')} />
    </IconContainer>
  </ListItemContainer>
);

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
