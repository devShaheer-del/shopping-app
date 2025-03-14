const express = require('express');
const createProductController = require('../controller/createProducts');

const router = express.Router();

router.post('/AddProducts', createProductController.createProduct);

module.exports = router;
