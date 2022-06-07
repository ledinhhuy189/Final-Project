const prisma = require('../models/prisma');

const conversationModel = prisma.conversation;

const findConversation = async ({ userId }) => {
   const find = await conversationModel.findMany({
      where: {
         members: {
            some: {
               userId: userId,
            },
         },
      },
      include: {
         messages: {
            take: 1,
            orderBy: {
               createdAt: 'desc',
            },
         },
         members: {
            where: {
               userId: {
                  not: {
                     equals: userId,
                  },
               },
            },
            select: {
               user: true,
            },
         },
      },
   });

   return find;
};

const findMessageInConversation = async ({ conversationId }) => {
   const find = await conversationModel.findUnique({
      where: {
         id: Number(conversationId),
      },
      include: {
         messages: {
            include: {
               user: true,
            },
         },
         members: {
            select: {
               user: true,
            },
         },
      },
   });

   return find;
};

module.exports = {
   findConversation,
   findMessageInConversation,
};
