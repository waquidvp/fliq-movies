import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

const router = Router();

router.get('/', (req, res) => {
  res.send('Auth Endpoint for Fliq');
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.json({
      success: false,
      message: 'User already exists',
    });
  } else if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const createdUser = await newUser.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);

    const userPayload = {
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    };

    res.json({
      success: true,
      token,
      user: userPayload,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(401).send({
      success: false,
      message: 'User not found',
    });
  } else if (user) {
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).send({
        success: false,
        message: 'Incorrect Password',
      });
    } else if (validPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const userPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      res.json({
        success: true,
        token,
        user: userPayload,
      });
    }
  }
});

export default router;
