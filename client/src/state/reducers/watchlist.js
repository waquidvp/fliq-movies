const watchlist = (
  state = {
    movies: [],
    watchlistLoading: false,
    watchlistError: '',
    watchedList: [],
    watchedListLoading: false,
    watchedListError: '',
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST_SUCCESS':
      return {
        ...state,
        movies: action.watchlist,
      };
    case 'REMOVE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: action.watchlist,
      };
    case 'WATCHED_MOVIE_SUCCESS':
      return {
        ...state,
        watchedList: action.watched,
        movies: action.watchlist,
      };
    case 'GET_WATCHLIST_START':
      return {
        ...state,
        watchlistLoading: true,
      };
    case 'GET_WATCHLIST_SUCCESS':
      return {
        ...state,
        watchlistLoading: false,
        movies: action.watchlist,
      };
    case 'GET_WATCHLIST_FAILED':
      return {
        ...state,
        watchlistLoading: false,
        watchlistError: action.error,
      };
    case 'GET_WATCHEDLIST_START':
      return {
        ...state,
        watchedListLoading: true,
      };
    case 'GET_WATCHEDLIST_SUCCESS':
      return {
        ...state,
        watchedListLoading: false,
        watchedList: action.watched,
      };
    case 'GET_WATCHEDLIST_FAILED':
      return {
        ...state,
        watchedListLoading: false,
        watchedListError: action.error,
      };
    default:
      return state;
  }
};

export default watchlist;
