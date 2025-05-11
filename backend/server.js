const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));