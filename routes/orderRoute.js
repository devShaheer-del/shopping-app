const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
// const { OrderValidation } = require('../middlewares/ordersValidate');


router.post('/create-order',  orderController.CreateOrder);



module.exports = router;