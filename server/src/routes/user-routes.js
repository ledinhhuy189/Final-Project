const express = require('express');
const router = express.Router();
const { userController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.get('/me/local', tokenVerify, userController.findMeLocal);
router.post('/upsert', userController.upsertUserLocal);
router.get('/lock', userController.checkAccountStatus);
router.get('/', tokenVerify, userController.findUser);

module.exports = router;
