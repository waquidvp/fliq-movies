const search = (
  state = {
    isLoading: false,
    results: [],
  },
  action,
) => {
  switch (action.type) {
    case 'RECIEVE_SEARCH_RESULTS':
      return {
        isLoading: false,
        results: action.response,
      };
    case 'STARTED_SEARCH':
      return {
        isLoading: true,
      };
    default:
      return state;
  }
};

export default search;
