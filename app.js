const express = require('express');
const compression = require('compression');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./models/User');
require('./config/passport');

mongoose.connect(keys.mongoURI);

const auth = require('./routes/auth');
const billing = require('./routes/billing');

const app = express();

if (process.env.NODE_ENV === 'production') {
  // Express will serv up production assets
  app.use(express.static(path.join(__dirname, 'client/build')));
  /*   app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); */
}

// Middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(compression(9));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use('/billing', billing);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
