import React, { Component } from 'react';
import { StatusBar, AppState, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';

import configureStore from './state';
import Loading from './components/Loading';
import MainNavigator from './Navigators/MainNavigator';

const MainContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

class App extends Component {
  state = {
    store: configureStore(),
    storeLoading: false,
  };

  componentWillMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.loadStoreFromStorage();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  loadStoreFromStorage = () => {
    this.setState({ storeLoading: true });

    AsyncStorage.getItem('store')
      .then((storeValue) => {
        if (storeValue) {
          const initialStore = JSON.parse(storeValue);
          this.setState({
            store: configureStore({
              auth: {
                user: initialStore.auth.user,
              },
            }),
          });
        }

        this.setState({ storeLoading: false });
      })
      .catch(() => {
        this.setState({ storeLoading: false });
      });
  };

  handleAppStateChange = () => {
    const { store } = this.state;
    let currentStore = store.getState();
    currentStore = JSON.stringify(currentStore);
    AsyncStorage.setItem('store', currentStore);
  };

  render() {
    const { store, storeLoading } = this.state;

    if (storeLoading) {
      return (
        <MainContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#00000014"
            translucent
          />
          <Loading />
        </MainContainer>
      );
    }

    return (
      <Provider store={store}>
        <MainContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#00000014"
            translucent
          />
          <MainNavigator />
        </MainContainer>
      </Provider>
    );
  }
}

export default App;
