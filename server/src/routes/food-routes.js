const express = require('express');
const router = express.Router();
const { foodController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.get('/:slug', tokenVerify, foodController.getFoodByIdInDb);
router.post('/', tokenVerify, foodController.createFoodInDb);
router.get('/', foodController.getFoodListInDb);

module.exports = router;
