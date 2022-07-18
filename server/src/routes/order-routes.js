const express = require('express');
const router = express.Router();
const { orderController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.post('/', tokenVerify, orderController.createOrder);

module.exports = router;
