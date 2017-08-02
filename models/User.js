const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: { type: String },
  credits: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
