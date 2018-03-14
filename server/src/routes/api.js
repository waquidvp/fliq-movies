import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import User from '../models/user';
import { postData } from '../../helpers';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send('Protected API endpoint for Fliq');
});

// Get movies in watchlist
router.get('/user/:userId/watchlist', async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.json({
    watchlist: user.watchlist,
  });
});

// Get movies in watched list
router.get('/user/:userId/watchlist/watched', async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.json({
    watched: user.watched,
  });
});

// Add movie to watchlist
router.post('/user/:userId/watchlist/add', async (req, res) => {
  const { userId } = req.params;
  const { movie_id } = req.body;

  const user = await User.findById(userId);

  let found = false;
  user.watchlist.forEach((movie) => {
    if (movie.movie_id === movie_id) found = true;
  });

  if (!found) user.watchlist.push({ movie_id });

  const updatedUser = await user.save();

  res.json({
    watchlist: updatedUser.watchlist,
  });
});

// Mark a movie as watched in watchlist
router.post('/user/:userId/watchlist/done', async (req, res) => {
  const { userId } = req.params;
  const { movie_id } = req.body;

  const user = await User.findById(userId);
  const movieIndex = user.watchlist.findIndex(movie => movie.movie_id === movie_id,);
  if (movieIndex !== -1) user.watchlist.splice(movieIndex, 1);

  let inWatched = false;
  user.watched.forEach((movie) => {
    if (movie.movie_id === movie_id) inWatched = true;
  });

  if (!inWatched) user.watched.push({ movie_id });

  const updatedUser = await user.save();

  res.json({
    watched: updatedUser.watched,
    watchlist: updatedUser.watchlist,
  });
});

// Remove movie from watchlist
router.post('/user/:userId/watchlist/remove', async (req, res) => {
  const { userId } = req.params;
  const { movie_id } = req.body;

  const user = await User.findById(userId);
  const movieIndex = user.watchlist.findIndex(movie => movie.movie_id === movie_id,);

  if (movieIndex !== -1) user.watchlist.splice(movieIndex, 1);

  const updatedUser = await user.save();

  res.json({
    watchlist: updatedUser.watchlist,
  });
});

// Get user movie preferences
router.get('/user/:userId/preferences', async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.json({
    preferences: user.preferences,
  });
});

// Set user movie preferences
router.post('/user/:userId/preferences', async (req, res) => {
  const { userId } = req.params;
  const { preferences } = req.body;

  const user = await User.findById(userId);

  user.preferences = preferences;

  const updatedUser = await user.save();

  res.json({
    preferences: updatedUser.preferences,
  });
});

// Get all liked movies
router.get('/user/:userId/ratings/likes', async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.json({
    likes: user.likes,
  });
});

// Add a movie that user likes
router.post('/user/:userId/ratings/likes', async (req, res) => {
  const { userId } = req.params;
  const { movie_id } = req.body;

  const user = await User.findById(userId);

  let found = false;
  user.likes.forEach((movie) => {
    if (movie.movie_id === movie_id) found = true;
  });

  if (!found) user.likes.push({ movie_id });

  const updatedUser = await user.save();

  res.json({
    likes: updatedUser.likes,
  });
});

// Get recommendations
router.get('/user/:userId/recommend', async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  const engineUrl = 'http://localhost:5000/recommendations';

  postData(`${engineUrl}/initial`, user.preferences).then((response) => {
    res.json(response);
  });
});

export default router;
