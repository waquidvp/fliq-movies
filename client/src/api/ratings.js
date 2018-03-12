import { apiEndpoint } from './config';
import { postData, getData } from './helpers';

export const getLikedMovies = (userId, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/ratings/likes`;

  return getData(url, token);
};

export const likeMovie = (userId, movie_id, token) => {
  const url = `${apiEndpoint}/api/user/${userId}/ratings/likes`;

  return postData(url, { movie_id }, token);
};
