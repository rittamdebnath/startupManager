const express = require('express');
const compression = require('compression');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/User');
require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
const auth = require('./routes/auth');
const billing = require('./routes/billing');
app.use('/billing', billing);
app.use('/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(compression());
app.use(logger('dev'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app;
