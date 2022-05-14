const { userService } = require('../services');

const test = async (req, res, next) => {
   const testJSON = {
      message: 'Hello world',
   };

   return res.json(testJSON);
};

const getMeLocal = async (req, res, next) => {
   try {
      const params = {
         ...req.query,
      };

      const response = await userService.getMeLocalDb(params);
      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   test,
   getMeLocal,
};
