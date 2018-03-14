import { combineReducers } from 'redux';

import watchlist from './watchlist';
import search from './search';
import auth from './auth';
import recommend from './recommend';
import ratings from './ratings';
import moviesCache from './moviesCache';

const appState = combineReducers({
  watchlist,
  search,
  auth,
  recommend,
  ratings,
  moviesCache,
});

export default appState;
