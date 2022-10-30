const categorySeeder = require('./category');
const userSeeder = require('./user');
const orderStatusSeeder = require('./orderStatus');
const conversationSeeder = require('./conversation');
const roleSeeder = require('./role');

const loader = async () => {
   try {
      await roleSeeder();
      await userSeeder();
      await categorySeeder();
      await orderStatusSeeder();
      await conversationSeeder();
   } catch (error) {
      return error;
   }
};

loader();
