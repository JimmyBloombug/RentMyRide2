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

// Create Public Folder
app.use('/public', express.static('./public'));

// Routes
app.use('/server/users', require('./routes/users'));
app.use('/server/auth', require('./routes/auth'));
app.use('/server/cars', require('./routes/cars'));

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
