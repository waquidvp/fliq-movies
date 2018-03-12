import { search as searchApi } from '../../api/search';

export const receiveSearch = response => ({
  type: 'RECEIVE_SEARCH_RESULTS',
  response,
});

export const startSearch = () => ({
  type: 'STARTED_SEARCH',
});

export const search = searchTerm => (dispatch) => {
  dispatch(startSearch());

  searchApi(searchTerm, (response) => {
    dispatch(receiveSearch(response.results));
  });
};
