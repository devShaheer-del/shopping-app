const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_address: {
        type: String,
        required: true
    },
    customer_phone: {
        type: Number,
        required: true
    },
    customer_card: {
        type: Number,
        required: true
    },
    customer_expire: {
        type: String,
        required: true
    },
    customer_cvv: {
        type: Number,
        required: true
    },
    cartItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',  // Assuming you are referencing a Product model
            required: true
        }
    ]
});

const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports = OrderModel;
