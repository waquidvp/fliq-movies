import { tmdbApiKey, tmdbEndpoint } from './config';

const getMovieDetails = movie_id =>
  fetch(`${tmdbEndpoint}/movie/${movie_id}?api_key=${tmdbApiKey}&language=en-UK&append_to_response=videos,credits`,).then(res => res.json());

export { getMovieDetails };
