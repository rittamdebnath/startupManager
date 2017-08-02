const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const router = express.Router();

router.post('/stripe', async (req, res) => {
  // console.log(req.body);
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id, // obtained with Stripe.js
    description: '$5 for 5 credits',
  });
  console.log('charge ' + JSON.stringify(charge, null, 2));
});

module.exports = router;
