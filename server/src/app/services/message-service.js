const prisma = require('../models/prisma');

const messageModel = prisma.message;

const findMessage = async ({ conversationId }) => {
   const find = await messageModel.findMany({
      where: {
         conversationId,
      },
      include: {
         user: true,
      },
   });

   return find;
};

const createMessage = async (formData) => {
   const create = await messageModel.create({
      data: {
         conversationId: Number(formData.conversationId),
         content: formData.content,
         userId: formData.userId,
      },
   });

   return create;
};

module.exports = {
   findMessage,
   createMessage,
};
