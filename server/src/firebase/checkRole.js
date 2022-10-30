const { userService } = require('../app/services');

const checkUserRole = async (req, res, next) => {
   const userInfo = req.getUserInfoByToken;
   const check = await userService.findMe({
      email: userInfo.email,
   });

   if (check.role.name !== 'ADMIN') {
      return res.status(401).json({ message: 'not_admin' });
   }

   return next();
};

module.exports = checkUserRole;
