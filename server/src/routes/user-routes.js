const express = require('express');
const router = express.Router();
const { userController } = require('../app/controllers');

router.get('/me/local', userController.getMeLocal);
router.get('/', userController.test);

module.exports = router;
