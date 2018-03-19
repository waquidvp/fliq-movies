import React, { Component } from 'react';
import { StatusBar, AppState, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';

import configureStore from './state';
import Loading from './components/Loading';
import MainNavigator from './Navigators/MainNavigator';

// style definitions
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
    // listen for when the app goes into background or is closed
    AppState.addEventListener('change', this.handleAppStateChange);
    // load the store from storage so the app state rehydrated
    this.loadStoreFromStorage();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  loadStoreFromStorage = () => {
    this.setState({ storeLoading: true });

    // gets the store from storage
    AsyncStorage.getItem('store')
      .then((storeValue) => {
        if (storeValue) {
          // in storage, the store is saved as a string, so JSOn is parsed
          const initialStore = JSON.parse(storeValue);

          // parts of the state is rehydrated by the store in storage
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
    // everytime the state of the app changes, the current state of the store is saved
    const { store } = this.state;
    let currentStore = store.getState();
    currentStore = JSON.stringify(currentStore);
    AsyncStorage.setItem('store', currentStore);
  };

  render() {
    const { store, storeLoading } = this.state;

    // While the store is loading, render the loading screen
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

    // if the store is loaded, the app is rendered by calling the root navigator: MainNavigator
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
