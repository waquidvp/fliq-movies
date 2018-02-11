import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import TabIcon from '../components/TabIcon';
import Header from '../components/Header';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import MovieListItem from '../components/MovieListItem';
import Card from '../components/Card';

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

movieList = [];

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
            renderItem={({ item }) => (
              <MovieListItem
                movie={item}
                RightIcon={
                  <IconButton source={require('../assets/icons/Tick.png')} />
                }
              />
            )}
            ListHeaderComponent={() => <ListSpacer />}
            ListFooterComponent={() => <ListBottomSpacer />}
          />
          <LinearGradient
            colors={['#ecf0f100', '#ecf0f1']}
            style={styles.fuzzyOverlayBottom}
          />
        </ListContainer>
        <Card
          style={{
            position: 'absolute',
            height: 44,
            bottom: 16,
            borderRadius: 22,
          }}
          innerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
          elevation={6}
          activeElevation={10}
        >
          <Icon source={require('../assets/icons/Add.png')} />
          <AddMovieButtonText>Add Movie</AddMovieButtonText>
        </Card>
      </MainContainer>
    );
  }
}

export default Watchlist;
