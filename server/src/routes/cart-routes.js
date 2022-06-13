const express = require('express');
const router = express.Router();
const { cartController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.patch('/:cartId', tokenVerify, cartController.upsertCartInDb);
router.get('/', tokenVerify, cartController.getCartListInDb);

module.exports = router;
