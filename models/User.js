const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
