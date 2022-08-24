const prisma = require('../models/prisma');

const CONVERSATION_SEED_DATA = [
   {
      createdAt: new Date(),
      updatedAt: new Date(),

      members: [
         {
            userId: 'DPDikOoqdDN65shE7d66Wwn2bjy2',
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            userId: 'jli6FN16VgO3a1jKQRnfqe98qSn1',
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ],
   },
];

const conversationSeeder = async () => {
   CONVERSATION_SEED_DATA.forEach(async (element) => {
      await prisma.conversation.create({
         data: {
            createdAt: element.createdAt,
            updatedAt: element.updatedAt,
            members: {
               createMany: {
                  data: element.members,
               },
            },
         },
      });
   });
};

module.exports = conversationSeeder;
