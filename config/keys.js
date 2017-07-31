if (process.env.NODE_ENV === 'production') {
  // PROD
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
