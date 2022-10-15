const express = require('express');
const { userController, orderController } = require('../app/controllers');

const router = express.Router();

const { tokenVerify } = require('../firebase');

// user
router.put('/user/update', tokenVerify, userController.upsertUserLocal);

// order
router.put(
   '/status/update',
   tokenVerify,
   orderController.changeOrderStatusInDb
);

module.exports = router;
