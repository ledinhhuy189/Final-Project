const { userService } = require('../services');

const test = async (req, res, next) => {
   const testJSON = {
      message: 'Hello world',
   };

   return res.json(testJSON);
};

const findMeLocal = async (req, res, next) => {
   const userInfo = req.getUserInfoByToken;

   try {
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
      const isUserExist = await userService.findUser({
         email: req.body.email,
      });

      if (isUserExist) return res.json({ message: 'user_already_exists' });

      const upsertUserResponse = await userService.upsertUser({ ...req.body });

      return res.json(upsertUserResponse);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   test,
   findMeLocal,
   upsertUserLocal,
};
