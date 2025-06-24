const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFile, getFileColumns, getFilePreview, getChartData } = require('../controllers/FileController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /files/upload
router.post('/upload', upload.single('file'), uploadFile);

// GET /files/:id/columns
router.get('/:id/columns', getFileColumns);

// GET /files/:id/preview
router.get('/:id/preview', getFilePreview);

// GET /files/:id/chart-data
router.get('/:id/chart-data', getChartData);

module.exports = router; 