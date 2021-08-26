const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

router.post('/payment', shopController.createPayment);

module.exports = router;