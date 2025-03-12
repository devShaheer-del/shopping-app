const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');

router.post('/create', AdminController.CreateAdmin);
router.post('/adminLogin',AdminController.AdminLogin)

module.exports = router;
