const categorySeeder = require('./category');
const userSeeder = require('./user');
const orderStatusSeeder = require('./orderStatus');
const conversationSeeder = require('./conversation');

const loader = async () => {
   try {
      await userSeeder();
      await orderStatusSeeder();
      await conversationSeeder();
      await categorySeeder();
   } catch (error) {
      return error;
   }
};

loader();
