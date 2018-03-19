import { tmdbApiKey, tmdbEndpoint } from './config';

const search = searchTerm =>
  fetch(`${tmdbEndpoint}/search/movie?api_key=${tmdbApiKey}&language=en-UK&query=${searchTerm}&page=1&include_adult=false`,).then(res => res.json());

export { search };
