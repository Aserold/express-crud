const express = require('express');
const logger = require('./middlewares/middlewares');
const users = require('./routes/userRouter');

const server = express();
const PORT = 3000;

server.use(logger);
server.use('', users);

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
