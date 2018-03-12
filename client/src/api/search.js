import { tmdbApiKey, tmdbEndpoint } from './config';

const search = (searchTerm, callback) => {
  fetch(`${tmdbEndpoint}/search/movie?api_key=${tmdbApiKey}&language=en-UK&query=${searchTerm}&page=1&include_adult=false`,)
    .then(res => res.json())
    .then(res => callback(res))
    .catch(err => console.warn(err));
};

export { search };
