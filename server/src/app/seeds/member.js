const prisma = require('../models/prisma');

const MEMBER_SEED_DATA = [
   {
      conversationId: 999999999,
      userId: 'DPDikOoqdDN65shE7d66Wwn2bjy2',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      conversationId: 999999999,
      userId: 'jli6FN16VgO3a1jKQRnfqe98qSn1',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
];

const memberSeeder = async () => {
   MEMBER_SEED_DATA.forEach(async (element) => {
      await prisma.member.create({
         data: element,
      });
   });
};

module.exports = memberSeeder;
