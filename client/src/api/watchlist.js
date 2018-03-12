import { apiEndpoint } from './config';
import { postData, getData } from './helpers';

export const getWatchlist = (userId, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/watchlist`;

  return getData(url, token);
};

export const addToWatchlist = (userId, movie_id, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/watchlist/add`;

  return postData(url, { movie_id }, token);
};

export const removeFromWatchlist = (userId, movie_id, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/watchlist/remove`;

  return postData(url, { movie_id }, token);
};

export const addToWatched = (userId, movie_id, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/watchlist/done`;

  return postData(url, { movie_id }, token);
};
