const { foodService } = require('../services');

const getFoodListInDb = async (req, res, next) => {
   try {
      const foodResponse = await foodService.getFoodList();
      return res.json(foodResponse);
   } catch (error) {
      return next(error);
   }
};

const getFoodByIdInDb = async (req, res, next) => {
   try {
      const foodResponse = await foodService.getFoodBySlug(req.params.slug);
      return res.json(foodResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   getFoodListInDb,
   getFoodByIdInDb,
};
