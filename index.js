const express = require('express');
const mw = require('./middlewares');
const userSchema = require('./schemas')
const userController = require('./userController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(mw.requestLogger);


app.get('/users', userController.listUsers);

app.post('/users', mw.validate(userSchema), userController.createUser);

app.get('/users/:id(\\d+)', userController.getUser);

app.put('/users/:id(\\d+)', mw.validate(userSchema), userController.updateUser);

app.delete('/users/:id(\\d+)', userController.deleteUser);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}.`));
