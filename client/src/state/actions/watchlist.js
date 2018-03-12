import * as watchlistApi from '../../api/watchlist';

export const addMovie = movie => ({
  type: 'ADD_MOVIE',
  movie,
});

export const removeMovie = id => ({
  type: 'REMOVE_MOVIE',
  id,
});

export const toggleWatchedMovie = id => ({
  type: 'TOGGLE_WATCHED_MOVIE',
  id,
});

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
        response,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_WATCHLIST_FAILED',
        error,
      });
    });
};

export const addToWatchlist = movie_id => (dispatch, getState) => {
  const { auth } = getState();

  watchlistApi
    .addToWatchlist(auth.user.id, movie_id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'ADD_TO_WATCHLIST_SUCCESS',
        response,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'ADD_TO_WATCHLIST_FAILED',
        error,
      });
    });
};
