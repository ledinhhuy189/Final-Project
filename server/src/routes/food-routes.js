const express = require('express');
const router = express.Router();
const { foodController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.get('/:slug', tokenVerify, foodController.getFoodByIdInDb);
router.get('/', tokenVerify, foodController.getFoodListInDb);

module.exports = router;
