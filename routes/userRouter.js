const express = require('express');
const mw = require('../middlewares/userMiddlewares');
const userSchema = require('../schemas/userSchemas');
const userController = require('../controllers/userController');

const router = express.Router();
const PORT = 3000;

router.use(express.json());

router.get('/users', userController.listUsers);

router.post('/users', mw.validate(userSchema), userController.createUser);

router.get('/users/:id(\\d+)', userController.getUser);

router.put(
  '/users/:id(\\d+)',
  mw.validate(userSchema),
  userController.updateUser
);

router.delete('/users/:id(\\d+)', userController.deleteUser);

module.exports = router;
