const FileModel = require('../models/File');
const xlsx = require('xlsx');
const path = require('path');

// POST /files/upload
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const user = req.body.user || (req.user && req.user.email) || 'anonymous';
    const filePath = req.file.path;
    // Save file info to DB
    const fileDoc = new FileModel({ user, file: filePath });
    await fileDoc.save();
    // Parse columns
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const columns = json[0] || [];
    res.status(201).json({ success: true, fileId: fileDoc._id, columns });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
};

// GET /files/:id/columns
const getFileColumns = async (req, res) => {
  try {
    const fileDoc = await FileModel.findById(req.params.id);
    if (!fileDoc) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    const workbook = xlsx.readFile(fileDoc.file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const columns = json[0] || [];
    res.json({ success: true, columns });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get columns', error: err.message });
  }
};

// GET /files/:id/preview
const getFilePreview = async (req, res) => {
  try {
    const fileDoc = await FileModel.findById(req.params.id);
    if (!fileDoc) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    const workbook = xlsx.readFile(fileDoc.file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    // Get first 10 rows (including header)
    const preview = json.slice(0, 11); // 0 = header, 1-10 = first 10 rows
    res.json({ success: true, preview });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get preview', error: err.message });
  }
};

// GET /files/:id/chart-data
const getChartData = async (req, res) => {
  try {
    const fileDoc = await FileModel.findById(req.params.id);
    if (!fileDoc) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    const { xAxis, yAxis } = req.query;
    if (!xAxis || !yAxis) {
      return res.status(400).json({ success: false, message: 'xAxis and yAxis are required' });
    }
    const workbook = xlsx.readFile(fileDoc.file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(worksheet, { defval: null });
    // Debug log
    console.log('xAxis:', xAxis, 'yAxis:', yAxis);
    console.log('First row:', json[0]);
    // Group by xAxis and sum yAxis values
    const dataMap = {};
    json.forEach(row => {
      const xValue = row[xAxis];
      const yValue = Number(row[yAxis]);
      if (xValue == null || isNaN(yValue)) return;
      if (!dataMap[xValue]) dataMap[xValue] = 0;
      dataMap[xValue] += yValue;
    });
    const labels = Object.keys(dataMap);
    const values = labels.map(label => dataMap[label]);
    res.json({ success: true, labels, values });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get chart data', error: err.message });
  }
};

module.exports = { uploadFile, getFileColumns, getFilePreview, getChartData }; 