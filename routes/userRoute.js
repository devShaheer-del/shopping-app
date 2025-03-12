const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { SignupValidation, LoginValidation } = require('../middlewares/userValidation');

router.post('/userCreate',SignupValidation, userController.CreateUser);
router.post('/userLogin',LoginValidation,userController.LoginUser);
router.get('/getUsers',userController.getUser)

module.exports = router;
