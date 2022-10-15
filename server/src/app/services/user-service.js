const prisma = require('../models/prisma');

const userModel = prisma.user;

const findMe = async ({ email }) => {
   const find = await userModel.findUnique({
      where: {
         email,
      },
      include: {
         cart: {
            select: {
               id: true,
            },
         },
      },
   });

   return find;
};

const findUser = async ({ email }) => {
   const find = await userModel.findUnique({
      where: {
         email,
      },
   });

   return find;
};

const upsertUser = async ({
   email,
   name,
   id,
   photoURL = null,
   isDeleted = null,
}) => {
   const updatePayload = { email, name, photoURL };
   const createPayload = {
      id,
      email,
      name,
      photoURL,
      cart: {
         create: {
            createdAt: new Date(),
         },
      },
   };

   if (isDeleted) {
      updatePayload.isDeleted = isDeleted;
   }

   const create = await userModel.upsert({
      where: {
         id,
      },
      update: updatePayload,
      create: createPayload,
   });

   return create;
};

module.exports = {
   findMe,
   findUser,
   upsertUser,
};
