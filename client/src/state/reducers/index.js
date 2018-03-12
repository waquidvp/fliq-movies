import { combineReducers } from 'redux';
import watchlist from './watchlist';
import search from './search';
import auth from './auth';
import recommend from './recommend';

const appState = combineReducers({
  watchlist,
  search,
  auth,
  recommend,
});

export default appState;
