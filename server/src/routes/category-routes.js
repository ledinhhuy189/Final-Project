const express = require('express');
const router = express.Router();
const { categoryController } = require('../app/controllers');

router.get('/', categoryController.getCategoryListInDb);

module.exports = router;
