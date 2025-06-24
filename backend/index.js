const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const FileRouter = require('./routes/FileRouter');
const fs = require('fs');

require('dotenv').config();
require('./models/db'); // Ensure this file exists and is correctly set up to connect to MongoDB

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.send('Pongs');
});

app.use(bodyParser.json());
app.use(cors()); // enable requests from any origin or any PORTS.
app.use('/auth', AuthRouter);
app.use('/files', FileRouter);

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});