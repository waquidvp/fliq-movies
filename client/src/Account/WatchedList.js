import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import MovieListItem from '../components/MovieListItem';

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
    const { watchlist } = this.props;

    return (
      <MainContainer>
        <ListContainer>
          <LinearGradient
            colors={['#fafafa', '#fafafa00']}
            style={styles.fuzzyOverlayTop}
          />
          <List
            data={watchlist}
            renderItem={({ item }) => {
              if (item.watched === true) {
                return (
                  <MovieListItem
                    movie={item.movie}
                    // RightIcon={
                    //   <IconButton
                    //     source={require('../assets/icons/Tick.png')}
                    //     onPress={() => onTickPressed(item.movie.id)}
                    //   />
                    // }
                    onPress={() =>
                      mainNavigation.navigate('MovieDetail', {
                        movie: item.movie,
                      })
                    }
                  />
                );
              }

              return null;
            }}
            ListHeaderComponent={() => <ListSpacer />}
            ListFooterComponent={() => <ListSpacer />}
          />
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
});

export default connect(mapStateToProps)(WatchedList);
