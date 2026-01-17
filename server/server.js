const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const calculatorRoutes = require('./routes/calculator');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/calculator', calculatorRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('CarbonX API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});