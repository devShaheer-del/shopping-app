const express = require('express');
const createProductController = require('../controller/createProducts');

const router = express.Router();

router.post('/AddProducts', createProductController.createProduct);
router.get('/getAllProducts',createProductController.getProducts);
router.delete('/deleteProduct/:id',createProductController.deleteProduct);
module.exports = router;
