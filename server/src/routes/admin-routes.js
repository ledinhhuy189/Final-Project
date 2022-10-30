const express = require('express');
const {
   userController,
   orderController,
   adminController,
} = require('../app/controllers');

const router = express.Router();

const { tokenVerify } = require('../firebase');
const checkUserRole = require('../firebase/checkRole');

// user
router.put('/user/update', tokenVerify, userController.upsertUserLocal);

// order
router.put(
   '/status/update',
   tokenVerify,
   orderController.changeOrderStatusInDb
);

router.patch(
   '/user/lock',
   [tokenVerify, checkUserRole],
   adminController.lockUser
);

router.get('/users', [tokenVerify, checkUserRole], adminController.getAllUser);

module.exports = router;
