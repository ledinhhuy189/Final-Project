const { categoryService } = require('../services');

const getCategoryListInDb = async (req, res, next) => {
   const categoryResponse = await categoryService.getCategoryList();
   return res.json(categoryResponse);
};

module.exports = {
   getCategoryListInDb,
};
