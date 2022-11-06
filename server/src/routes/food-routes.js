const express = require('express');
const router = express.Router();
const { foodController } = require('../app/controllers');
const { tokenVerify } = require('../firebase');

router.get('/my', tokenVerify, foodController.getFoodOfUserInDb);
router.patch('/:foodId/disable', tokenVerify, foodController.disableFoodInDb);
router.get('/:slug', tokenVerify, foodController.getFoodByIdInDb);
router.post('/', tokenVerify, foodController.createFoodInDb);
router.get('/', foodController.getFoodListInDb);

module.exports = router;
