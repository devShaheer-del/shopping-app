const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');
const { ContactValidation } = require('../middlewares/contactValidate');

router.post('/contact', ContactValidation, contactController.createContact);

module.exports = router;
