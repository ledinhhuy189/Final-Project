const { adminService } = require('../services');

const getAllUser = async (req, res, next) => {
   try {
      const response = await adminService.getAllUser({ ...req.query });
      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

const lockUser = async (req, res, next) => {
   try {
      const response = await adminService.lockUser({
         ...req.body,
      });

      return res.json(response);
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   getAllUser,
   lockUser,
};
