const prisma = require('../models/prisma');

const userModel = prisma.user;

const getAllUser = async ({ email }) => {
   const find = await userModel.findMany({
      where: {
         email: {
            contains: email ? email : undefined,
         },
         NOT: {
            role: {
               name: 'ADMIN',
            },
         },
      },
   });
   return find;
};

const lockUser = async ({ email, isDeleted }) => {
   const lock = await userModel.update({
      where: {
         email: email,
      },
      data: {
         isDeleted: isDeleted ? new Date() : null,
      },
   });

   return lock;
};

module.exports = {
   getAllUser,
   lockUser,
};
