const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to Rent My Ride, your private car sharing site' })
);

// Routes
app.use('/server/users', require('./routes/users'));
// TODO: define route CARS
// TODO: define route AUTH

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
