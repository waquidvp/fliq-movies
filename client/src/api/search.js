import tmdbApiKey from './config';

const search = (searchTerm, callback) => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-UK&query=${searchTerm}&page=1&include_adult=false`,
  )
    .then(res => res.json())
    .then(res => callback(res))
    .catch(err => console.warn(err));
};

export { search };
