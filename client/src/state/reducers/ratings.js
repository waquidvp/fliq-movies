const ratings = (
  state = {
    likedMovies: [],
    likedlistLoading: false,
    likedlistError: '',
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_TO_LIKES_SUCCESS':
      return {
        ...state,
        likedMovies: action.likes,
      };
    case 'GET_LIKEDLIST_START':
      return {
        ...state,
        likedlistLoading: true,
      };
    case 'GET_LIKEDLIST_SUCCESS':
      return {
        ...state,
        likedlistLoading: false,
        likedMovies: action.likes,
      };
    case 'GET_LIKEDLIST_FAILED':
      return {
        ...state,
        likedlistLoading: false,
        likedlistError: action.error,
      };
    default:
      return state;
  }
};

export default ratings;
