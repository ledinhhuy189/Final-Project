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

const findConversationByMember = async ({ memberName, email, userId }) => {
   const find = await conversationModel.findMany({
      where: {
         AND: [
            {
               members: {
                  some: {
                     user: {
                        name: {
                           contains: memberName,
                           mode: 'insensitive',
                        },
                     },
                  },
               },
            },
            {
               members: {
                  some: {
                     user: {
                        email: {
                           contains: email,
                        },
                     },
                  },
               },
            },
         ],
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

const createConversation = async ({ from, to }) => {
   const receiverConversations = await prisma.member
      .findMany({
         where: { userId: to },
         select: { conversationId: true },
      })
      .then((res) => res && res.length > 0 && res.map((o) => o.conversationId));

   let conversation;

   if (receiverConversations && receiverConversations.length > 0) {
      conversation = await prisma.member.findFirst({
         where: {
            AND: [
               { userId: from },
               {
                  conversationId: {
                     in: receiverConversations,
                  },
               },
            ],
         },
         select: {
            conversationId: true,
         },
      });
   }

   if (!conversation) {
      const createConversationResult = await prisma.conversation.create({
         data: {
            members: {
               createMany: {
                  data: [
                     {
                        userId: from,
                     },
                     {
                        userId: to,
                     },
                  ],
               },
            },
         },
         select: {
            id: true,
         },
      });

      conversation = {
         conversationId: createConversationResult.id,
      };
   }

   return conversation;
};

module.exports = {
   findConversation,
   findMessageInConversation,
   findConversationByMember,
   createConversation,
};
