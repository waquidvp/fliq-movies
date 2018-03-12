import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import auth from './routes/auth';
import api from './routes/api';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbUrl = `mongodb://${process.env.DB_USER}:${
  process.env.DB_PASS
}@ds245228.mlab.com:45228/fliq`;

mongoose.connect(dbUrl, () => console.log('Connected to DB'));

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('API for Fliq');
});

app.use('/api', api);

app.listen(5001, () => console.log('Main API started on port 5001'));
