import { search as searchApi } from '../../api/search';

const searchSuccess = response => ({
  type: 'SEARCH_SUCCESS',
  results: response.results,
});

const searchStart = () => ({
  type: 'SEARCH_START',
});

const searchFailed = error => ({
  type: 'SEARCH_FAILED',
  error,
});

export const search = searchTerm => (dispatch) => {
  dispatch(searchStart());

  searchApi(searchTerm)
    .then((response) => {
      dispatch(searchSuccess(response));
    })
    .catch(error => dispatch(searchFailed(error)));
};

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH',
});
