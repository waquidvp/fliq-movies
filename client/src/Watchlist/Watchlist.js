import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import TabIcon from '../components/TabIcon';
import Header from '../components/Header';

const MainContainer = styled.View`
  flex: 1;
`;

const ListContainer = styled.View`
  flex: 1;
`;

const List = styled.FlatList`
  flex: 1;
`;

const ListSpacer = styled.View`
  height: 16px;
`;

const ListItemContainer = styled.View`
  flex: 1;
  height: 110px;
  background-color: white;
  margin: 4px 16px;
  border-radius: 15px;
  elevation: 3;
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
            data={[
              { key: 'a' },
              { key: 'b' },
              { key: 'c' },
              { key: 'd' },
              { key: 'e' },
            ]}
            renderItem={() => <ListItemContainer />}
            ListHeaderComponent={() => <ListSpacer />}
            ListFooterComponent={() => <ListSpacer />}
          />
          <LinearGradient
            colors={['#ecf0f100', '#ecf0f1']}
            style={styles.fuzzyOverlayBottom}
          />
        </ListContainer>
      </MainContainer>
    );
  }
}

export default Watchlist;
