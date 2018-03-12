const watchlist = (
  state = {
    movies: {},
    byId: [],
    watchlistLoading: false,
    watchlistError: '',
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_MOVIE': {
      const movieIndex = state.findIndex(movie => movie.movie.id === action.movie.id && movie.watched === true,);

      if (movieIndex > -1) {
        newState = state;
        newState.splice(movieIndex, 1);
        newState = [
          ...newState,
          {
            movie: action.movie,
            watched: false,
          },
        ];
        return newState;
      }

      return [
        ...state,
        {
          movie: action.movie,
          watched: false,
        },
      ];
    }
    case 'REMOVE_MOVIE': {
      const movieIndex = state.findIndex(movie => movie.movie.id === action.id && movie.watched === false,);

      if (movieIndex > -1) {
        const newState = state;
        newState.splice(movieIndex, 1);
        return newState;
      }

      return state;
    }
    case 'TOGGLE_WATCHED_MOVIE':
      return state.map((movie) => {
        if (movie.movie.id === action.id) {
          return {
            ...movie,
            watched: true,
          };
        }
        return movie;
      });
    case 'GET_WATCHLIST_START':
      return {
        ...state,
        watchlistLoading: true,
      };
    case 'GET_WATCHLIST_SUCCESS':
      return {
        ...state,
        watchlistLoading: false,
        movies: action.response,
      };
    case 'GET_WATCHLIST_FAILED':
      return {
        ...state,
        watchlistLoading: false,
        watchlistError: action.error,
      };
    case 'ADD_TO_WATCHLIST_SUCCESS':
      return {
        ...state,
        movies: [...state.movies, action.response],
      };
    default:
      return state;
  }
};

export default watchlist;
