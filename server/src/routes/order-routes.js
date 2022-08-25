const express = require('express');
const router = express.Router();
const { orderController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.patch('/status', tokenVerify, orderController.changeOrderStatusInDb);
router.get('/shop', tokenVerify, orderController.findOrderOfShopInDb);
router.get('/me', tokenVerify, orderController.findOrderOfUserInDb);
router.post('/', tokenVerify, orderController.createOrder);

module.exports = router;
