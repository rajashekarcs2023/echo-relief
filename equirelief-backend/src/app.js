require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const equityDataRoutes = require('./routes/equityData');
const firePerimetersRoutes = require('./routes/firePerimeters');
const recommendationsRoutes = require('./routes/recommendations');
const voicesRoutes = require('./routes/voices');
const ttsRoutes = require('./routes/tts');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/equity-data', equityDataRoutes);
app.use('/api/fire-perimeters', firePerimetersRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/voices', voicesRoutes);
app.use('/api/tts', ttsRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
