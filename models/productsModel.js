const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        unique: true
    },
    ProductCategory: {
        type: String,
        required: true
    },
    ProductPrize: {
        type: Number,
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },
    InStock: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const ProductModel = mongoose.model('Products', ProductsSchema);

module.exports = ProductModel;
