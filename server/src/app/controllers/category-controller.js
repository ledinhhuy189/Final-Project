const { categoryService } = require('../services');

const getCategoryListInDb = async (req, res, next) => {
   const categoryResponse = await categoryService.getCategoryList();
   return res.json(categoryResponse);
};

const getFoodInCategoryInDb = async (req, res, next) => {
   try {
      const categoryFoodResponse = await categoryService.getFoodInCategory({
         ...req.query,
      });
      return res.json(categoryFoodResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   getCategoryListInDb,
   getFoodInCategoryInDb,
};
