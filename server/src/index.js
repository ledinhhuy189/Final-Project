const express = require('express');
const cors = require('cors');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
   })
);

app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use(express.json());

route(app);

app.listen(PORT, () => {
   console.log(`listening on http://localhost:${PORT}`);
});
