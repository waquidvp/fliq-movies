import { tmdbApiKey, tmdbEndpoint } from './config';

const getMovieDetails = (movie_id, callback) => {
  fetch(`${tmdbEndpoint}/movie/${movie_id}?api_key=${tmdbApiKey}&language=en-UK&append_to_response=videos`,)
    .then(res => res.json())
    .then(res => callback(res))
    .catch(err => console.warn(err));
};

const getCredits = (movie_id, callback) => {
  fetch(`${tmdbEndpoint}/movie/${movie_id}/credits?api_key=${tmdbApiKey}`)
    .then(res => res.json())
    .then(res => callback(res))
    .catch(err => console.warn(err));
};

export { getMovieDetails, getCredits };
