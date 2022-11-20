const express = require('express');
const router = express.Router();
const { categoryController } = require('../app/controllers');

router.get('/food', categoryController.getFoodInCategoryInDb);
router.get('/', categoryController.getCategoryListInDb);

module.exports = router;
