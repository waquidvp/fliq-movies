const search = (
  state = {
    isLoading: false,
    results: [],
    error: '',
  },
  action,
) => {
  switch (action.type) {
    case 'SEARCH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        results: action.results,
      };
    case 'SEARCH_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'CLEAR_SEARCH':
      return {
        ...state,
        isLoading: false,
        results: [],
      };
    default:
      return state;
  }
};

export default search;
