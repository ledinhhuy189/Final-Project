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

const createFoodInDb = async (req, res, next) => {
   try {
      const userData = req.getUserInfoByToken;

      const createFoodResponse = await foodService.createFood({
         foodFormData: { ...req.body },
         userData,
      });

      return res.json(createFoodResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   getFoodListInDb,
   getFoodByIdInDb,
   createFoodInDb,
};
