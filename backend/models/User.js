const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
// This code defines a Mongoose schema and model for a User in a MongoDB database.