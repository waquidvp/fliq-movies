import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  preferences: {},
  watchlist: [
    {
      movie_id: Number,
    },
  ],
  watched: [
    {
      movie_id: Number,
    },
  ],
  likes: [
    {
      movie_id: Number,
    },
  ],
  dislikes: [
    {
      movie_id: Number,
    },
  ],
});

const User = mongoose.model('User', userSchema);

export default User;
