import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import appState from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState = {}) {
  return createStore(
    appState,
    initialState,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  );
}
