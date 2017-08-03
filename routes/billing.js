const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const router = express.Router();

router.post('/stripe', requireLogin, async (req, res) => {
  // console.log(req.body);
  if (!req.user) {
    return res.status(401).send({ error: 'You must login!' });
  }
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id, // obtained with Stripe.js
    description: '$5 for 5 credits',
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);

  // console.log('charge ' + JSON.stringify(charge, null, 2));
});

module.exports = router;
