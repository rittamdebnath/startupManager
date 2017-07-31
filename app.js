const express = require('express');
const compression = require('compression');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./models/User');
require('./config/passport');

mongoose.connect(keys.mongoURI);

const index = require('./routes/index');
const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();

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
app.use(express.static(path.join(__dirname, 'client/build')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS Settings
const corsOptions = { credentials: true, origin: 'http://localhost:3000' };
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use('/', index);
app.use('/api', api);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
