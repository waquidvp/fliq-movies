import mongoose from 'mongoose';

// define the schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  preferences: {
    Action: Number,
    Adventure: Number,
    Animation: Number,
    "Children's": Number,
    Comedy: Number,
    Crime: Number,
    Documentary: Number,
    Drama: Number,
    Fantasy: Number,
    'Film-Noir': Number,
    Horror: Number,
    Musical: Number,
    Mystery: Number,
    Romance: Number,
    'Sci-Fi': Number,
    Thriller: Number,
    War: Number,
    Western: Number,
  },
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

// create a user model from the defined schema
const User = mongoose.model('User', userSchema);

export default User;
