const prisma = require('../models/prisma');

const userModel = prisma.user;

const getMeLocalDb = async ({ email }) => {
   const findMe = await userModel.findUnique({
      where: {
         email,
      },
   });

   return findMe;
};

module.exports = {
   getMeLocalDb,
};
