const prisma = require('../models/prisma');

const CART_SEED_DATA = [
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
];

const cartSeeder = async () => {
   CART_SEED_DATA.forEach(async (element) => {
      await prisma.cart.create({
         data: element,
      });
   });
};

module.exports = cartSeeder;
