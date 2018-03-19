import * as ratingsApi from '../../api/ratings';

export const addToLikedlist = movie_id => (dispatch, getState) => {
  const { auth } = getState();

  ratingsApi
    .likeMovie(auth.user.id, movie_id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'ADD_TO_LIKES_SUCCESS',
        likes: response.likes,
      });
    });
};

export const getLikedlist = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({
    type: 'GET_LIKEDLIST_START',
  });

  ratingsApi
    .getLikedMovies(auth.user.id, auth.user.token)
    .then((response) => {
      dispatch({
        type: 'GET_LIKEDLIST_SUCCESS',
        likes: response.likes,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_LIKEDLIST_FAILED',
        error,
      });
    });
};
