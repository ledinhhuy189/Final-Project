const prisma = require('../models/prisma');

const USER_SEED_DATA = [
   {
      id: 'gqV5SB5htHUztnoUIdDX2qhNgtt1',
      email: 'test2@gmail.com',
      name: 'Test 2',
      photoURL:
         'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
   {
      id: 'IUAh502XkVV9NHPk9dSLVC49HlS2',
      email: 'test1@gmail.com',
      name: 'Test 1',
      photoURL:
         'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Pic.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
   },
];

const userSeeder = async () => {
   USER_SEED_DATA.forEach(async (element) => {
      await prisma.user.upsert({
         where: {
            id: element.id,
         },
         create: element,
         update: element,
      });
   });
};

module.exports = userSeeder;
