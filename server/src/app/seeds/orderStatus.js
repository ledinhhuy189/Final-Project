const prisma = require('../models/prisma');

const ORDER_STATUS_DATA = [
   {
      id: 1,
      name: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 2,
      name: 'SUCCESS',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
      id: 3,
      name: 'FAILURE',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
];

const orderStatusSeeder = async () => {
   ORDER_STATUS_DATA.forEach(async (element) => {
      await prisma.orderStatus.upsert({
         where: {
            id: element.id,
         },
         create: element,
         update: element,
      });
   });
};

module.exports = orderStatusSeeder;
