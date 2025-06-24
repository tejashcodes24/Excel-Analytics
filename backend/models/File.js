const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  file: {
    type: String, // file path
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const FileModel = mongoose.model('files', FileSchema);
module.exports = FileModel; 