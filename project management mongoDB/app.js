const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', projectRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectdb').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
