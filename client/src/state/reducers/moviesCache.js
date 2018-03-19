const moviesCache = (
  state = {
    movies: {},
    cacheLoading: false,
  },
  action,
) => {
  switch (action.type) {
    case 'GET_MOVIE_START':
      return {
        ...state,
        cacheLoading: true,
      };
    case 'GET_MOVIE_SUCCESS':
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.movie_id]: action.movieDetails,
        },
        cacheLoading: false,
      };
    default:
      return state;
  }
};

export default moviesCache;
