const express = require('express');
const securityController = require('../controllers/security');

const router = express.Router();


router.post('/login', securityController.getLogin);

module.exports = router;