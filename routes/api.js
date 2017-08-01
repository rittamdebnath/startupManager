const express = require('express');

const router = express.Router();

router.get('/current_user', (req, res) => {
  res.json(req.user);
  // res.send(req.session);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
