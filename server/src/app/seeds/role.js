const prisma = require('../models/prisma');

const ROLE_SEED_DATA = [
   {
      name: 'ADMIN',
   },
   {
      name: 'USER',
   },
];

const roleSeeder = async () => {
   ROLE_SEED_DATA.forEach(async (element) => {
      await prisma.role.create({
         data: element,
      });
   });
};

module.exports = roleSeeder;
