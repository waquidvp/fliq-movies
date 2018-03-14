import { getMovieDetails } from '../../api/movie';

export const addMovieToCache = movie_id => (dispatch) => {
  dispatch({
    type: 'GET_MOVIE_START',
  });

  getMovieDetails(movie_id).then((response) => {
    dispatch({
      type: 'GET_MOVIE_SUCCESS',
      movie_id,
      movieDetails: response,
    });
  });
};
