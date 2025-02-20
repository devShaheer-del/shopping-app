const express = require('express');
const { AuthProducts } = require('../middlewares/auth');
const ProductsController = require('../controller/productsController');

const router = express.Router();

router.get('/getProducts', AuthProducts, ProductsController.GetProducts);

module.exports = router;
