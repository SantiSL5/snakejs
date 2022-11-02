const express = require('express');
const router = express.Router();
const userController = require('../../controllers/controller_user')

//api/user

router.get('/', userController.getUsers);
router.post('/adduser', userController.addUser);
router.post('/login', userController.login);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;