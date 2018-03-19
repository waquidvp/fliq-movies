import * as watchlistApi from '../../api/watchlist';

export const addToWatchlist = movie_id => (dispatch, getState) => {
  const { auth } = getState();

  watchlistApi
    .addToWatchlist(auth.user.id, movie_id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'ADD_TO_WATCHLIST_SUCCESS',
        watchlist: response.watchlist,
      });
    });
};

export const removeFromWatchlist = movie_id => (dispatch, getState) => {
  const { auth } = getState();

  watchlistApi
    .removeFromWatchlist(auth.user.id, movie_id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'REMOVE_MOVIE_SUCCESS',
        watchlist: response.watchlist,
      });
    });
};

export const addToWatchedList = movie_id => (dispatch, getState) => {
  const { auth } = getState();

  watchlistApi
    .addToWatched(auth.user.id, movie_id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'WATCHED_MOVIE_SUCCESS',
        watched: response.watched,
        watchlist: response.watchlist,
      });
    });
};

export const getWatchlist = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({
    type: 'GET_WATCHLIST_START',
  });

  watchlistApi
    .getWatchlist(auth.user.id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'GET_WATCHLIST_SUCCESS',
        watchlist: response.watchlist,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_WATCHLIST_FAILED',
        error,
      });
    });
};

export const getWatchedList = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({
    type: 'GET_WATCHEDLIST_START',
  });

  watchlistApi
    .getWatchedList(auth.user.id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'GET_WATCHEDLIST_SUCCESS',
        watched: response.watched,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_WATCHEDLIST_FAILED',
        error,
      });
    });
};
