import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

// initialize router
const router = Router();

// the default route
router.get('/', (req, res) => {
  res.send('Auth Endpoint for Fliq');
});

// signup route
router.post('/signup', async (req, res) => {
  // the name, email, and password is extraacted from the request body
  const { name, email, password } = req.body;

  // looks for the user in database
  const user = await User.findOne({ email });

  if (user) {
    // if user exists then a error response is sent
    res.json({
      success: false,
      message: 'User already exists',
    });
  } else if (!user) {
    // a hash of the password is generated
    const passwordHash = await bcrypt.hash(password, 10);

    // a new user object is created with the user info
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    // the object is saved to the database
    const createdUser = await newUser.save();

    // a token is generated wiht the user id as its body
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);

    const userPayload = {
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    };

    // the user info and token is sent
    res.json({
      success: true,
      token,
      user: userPayload,
    });
  }
});

// login route
router.post('/login', async (req, res) => {
  // the email and password is extracted from the request body
  const { email, password } = req.body;

  // find the uesr in the database
  const user = await User.findOne({
    email,
  });

  if (!user) {
    // if user not found in the database, an error response is sent
    res.status(401).send({
      success: false,
      message: 'User not found',
    });
  } else if (user) {
    // if user is found the given password is compared to the hashed password on the database
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // if the password doesn't match with the one in the database,
      // an error response is sent
      res.status(401).send({
        success: false,
        message: 'Incorrect Password',
      });
    } else if (validPassword) {
      // if the password is valid, a token with the user id is created
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const userPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      // the user payload and the token is sent
      res.json({
        success: true,
        token,
        user: userPayload,
      });
    }
  }
});

export default router;
