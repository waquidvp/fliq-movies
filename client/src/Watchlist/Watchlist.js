import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import TabIcon from '../components/TabIcon';
import Header from '../components/Header';
import Icon from '../components/Icon';

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

const ListItemContainer = styled.View`
  flex: 1;
  height: 106px;
  background-color: white;
  margin: 4px 16px;
  border-radius: 15px;
  elevation: 3;
  overflow: hidden;
  flex-direction: row;
`;

const MoviePoster = styled.Image`
  height: 106px;
  width: 72px;
`;

const MovieInfoContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const GenreContainer = styled.View`
  flex-direction: row;
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

const AddMovieButtonContainer = styled.View`
  position: absolute;
  height: 44px;
  padding: 0 16px;
  background-color: white;
  elevation: 6;
  bottom: 16px;
  border-radius: 22px;
  flex-direction: row;
  align-items: center;
`;

const AddMovieButtonText = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: 500;
  padding-left: 16px;
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

movieList = [
  {
    key: 1,
    title: 'Fast and Furious 7',
    poster:
      'http://t1.gstatic.com/images?q=tbn:ANd9GcReedjA2vJSO4_6GDpsI3PShvbRqfAAEv03qaJ9qOxtiLZX0Jx7',
    genre: ['Crime', 'Thriller'],
    year: 2016,
  },
  {
    key: 2,
    title: 'Fast and Furious 7',
    poster:
      'http://t1.gstatic.com/images?q=tbn:ANd9GcReedjA2vJSO4_6GDpsI3PShvbRqfAAEv03qaJ9qOxtiLZX0Jx7',
    genre: ['Crime', 'Thriller'],
    year: 2016,
  },
  {
    key: 3,
    title: 'Fast and Furious 7',
    poster:
      'http://t1.gstatic.com/images?q=tbn:ANd9GcReedjA2vJSO4_6GDpsI3PShvbRqfAAEv03qaJ9qOxtiLZX0Jx7',
    genre: ['Crime', 'Thriller'],
    year: 2016,
  },
  {
    key: 4,
    title: 'Fast and Furious 7',
    poster:
      'http://t1.gstatic.com/images?q=tbn:ANd9GcReedjA2vJSO4_6GDpsI3PShvbRqfAAEv03qaJ9qOxtiLZX0Jx7',
    genre: ['Crime', 'Thriller'],
    year: 2016,
  },
  {
    key: 5,
    title: 'Fast and Furious 7',
    poster:
      'http://t1.gstatic.com/images?q=tbn:ANd9GcReedjA2vJSO4_6GDpsI3PShvbRqfAAEv03qaJ9qOxtiLZX0Jx7',
    genre: ['Crime', 'Thriller'],
    year: 2016,
  },
];

const WatchlistItem = ({ movie }) => (
  <ListItemContainer>
    <MoviePoster source={{ uri: movie.poster }} />
    <MovieInfoContainer>
      <Title>{movie.title}</Title>
      <GenreContainer>
        {movie.genre.map((genre, index, array) => {
          if (array.length - 1 === index) {
            return <Genre>{genre}</Genre>;
          }

          return <Genre>{`${genre}, `}</Genre>;
        })}
      </GenreContainer>
      <Year>{movie.year}</Year>
    </MovieInfoContainer>
    <IconContainer>
      <Icon source={require('../assets/icons/Tick.png')} />
    </IconContainer>
  </ListItemContainer>
);

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
  render() {
    return (
      <MainContainer>
        <Header title="Your Watch list" />
        <ListContainer>
          <LinearGradient
            colors={['#ecf0f1', '#ecf0f100']}
            style={styles.fuzzyOverlayTop}
          />
          <List
            data={movieList}
            renderItem={({ item }) => <WatchlistItem movie={item} />}
            ListHeaderComponent={() => <ListSpacer />}
            ListFooterComponent={() => <ListBottomSpacer />}
          />
          <LinearGradient
            colors={['#ecf0f100', '#ecf0f1']}
            style={styles.fuzzyOverlayBottom}
          />
        </ListContainer>
        <AddMovieButtonContainer>
          <Icon source={require('../assets/icons/Add.png')} />
          <AddMovieButtonText>Add Movie</AddMovieButtonText>
        </AddMovieButtonContainer>
      </MainContainer>
    );
  }
}

export default Watchlist;
