const { userService } = require('../services');

const test = async (req, res, next) => {
   const testJSON = {
      message: 'Hello world',
   };

   return res.json(testJSON);
};

const findMeLocal = async (req, res, next) => {
   try {
      const userInfo = req.getUserInfoByToken;
      const response = await userService.findMe({
         email: userInfo.email,
      });

      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

const upsertUserLocal = async (req, res, next) => {
   try {
      const upsertUserResponse = await userService.upsertUser({ ...req.body });
      return res.json(upsertUserResponse);
   } catch (error) {
      return next(error);
   }
};

const checkAccountStatus = async (req, res, next) => {
   try {
      const checkResponse = await userService.checkAccountStatus({
         email: req.query.email,
      });
      return res.json(checkResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   test,
   findMeLocal,
   upsertUserLocal,
   checkAccountStatus,
};
