const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');

router.post('/create', AdminController.CreateAdmin);
router.post('/adminLogin',AdminController.AdminLogin)
router.get('/getAdmin',AdminController.getAdmins)
router.post('/sendCredentials',AdminController.sendCredentials);
router.delete('/AdminDelete/:id',AdminController.adminDelete)
module.exports = router;
