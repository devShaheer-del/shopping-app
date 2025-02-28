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
        type: Number,  // Changed from String to Number
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },
    InStock: {
        type: Number,  // Changed from String to Number
        required: true
    }
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

const ProductModel = mongoose.model('Products', ProductsSchema);

module.exports = ProductModel;
