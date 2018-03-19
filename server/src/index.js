import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import the route handlers
import auth from './routes/auth';
import api from './routes/api';

// Load the .env files
dotenv.config();

// Initialize express
const app = express();

// Use body parser so that request body is parsed as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define database url user string interpolation
const dbUrl = `mongodb://${process.env.DB_USER}:${
  process.env.DB_PASS
}@ds245228.mlab.com:45228/fliq`;

// Use mongoose to connect to database
mongoose.connect(dbUrl, () => console.log('Connected to DB'));

// Pass the /auth router handler and attach it to the /auth route
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('API for Fliq');
});

// Pass the /api router handler and attach it to the /api route
app.use('/api', api);

// Open port 5001 and listen for requests
app.listen(5001, () => console.log('Main API started on port 5001'));
