const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.send('Pongs');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});