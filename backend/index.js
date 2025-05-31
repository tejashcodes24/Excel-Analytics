const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db'); // Ensure this file exists and is correctly set up to connect to MongoDB

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.send('Pongs');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});