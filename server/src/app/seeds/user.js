const prisma = require('../models/prisma');

const USER_SEED_DATA = [
   {
      id: 'DPDikOoqdDN65shE7d66Wwn2bjy2',
      email: 'test1@gmail.com',
      name: 'Test 1',
      photoURL:
         'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Pic.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
      phoneNumber: '0923645573',
      roleId: 2,
   },
   {
      id: 'jli6FN16VgO3a1jKQRnfqe98qSn1',
      email: 'test2@gmail.com',
      name: 'Test 2',
      photoURL:
         'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
      phoneNumber: '09232172384',
      roleId: 2,
   },
   {
      id: 'KEZZ6QymAfQmCjaNzSGaOn1MuHQ2',
      email: 'test10@gmail.com',
      name: 'Test 10',
      photoURL:
         'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: null,
      phoneNumber: '09232172384',
      roleId: 1,
   },
];

const userSeeder = async () => {
   USER_SEED_DATA.forEach(async (element) => {
      await prisma.user.upsert({
         where: {
            id: element.id,
         },
         create: {
            ...element,
            cart: {
               create: {
                  createdAt: new Date(),
                  updatedAt: new Date(),
               },
            },
         },
         update: {
            cart: {
               create: {
                  createdAt: new Date(),
                  updatedAt: new Date(),
               },
            },
         },
      });
   });
};

module.exports = userSeeder;
