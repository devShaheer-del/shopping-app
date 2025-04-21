const ProductDB =   require('../models/productsModel')
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dog8hzzop',
    api_key: '635187578911971',
    api_secret: 'wJiYLegJcR-3HmksZnJfrEhvOu4'
});

exports.createProduct = async (req, res) => {
    try {
        const { ProductName, ProductCategory, ProductPrize, InStock } = req.body;

        // Convert to numbers
        const productPrice = Number(ProductPrize);
        const inStockQty = Number(InStock);

        if (isNaN(productPrice) || isNaN(inStockQty)) {
            return res.status(400).json({ message: "Invalid price or stock quantity" });
        }

        // Check if product already exists
        const isAvailable = await ProductDB.findOne({ ProductName });
        if (isAvailable) {
            return res.status(400).json({
                message: "Product already exists",
                success: false
            });
        }

        // Check if a file is uploaded
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files.photo;

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "products"
        });

        // Create new product entry in database
        const newProduct = await ProductDB.create({
            ProductName,
            ProductCategory,
            ProductPrize: productPrice,
            ProductImage: result.secure_url,
            InStock: inStockQty
        });

        res.status(201).json({
            message: "Product created successfully",
            success: true,
            product: newProduct
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


exports.getProducts = async (req, res) => {
    try {
        const products = await ProductDB.find({});

        if (!products || products.length === 0) {
            return res.status(404).json({
                message: "Sorry, no products found!",
                success: false
            });
        }

        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products: products // Lowercase 'p' to match frontend
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
};



exports.deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;

        const deleteProduct = await ProductDB.findByIdAndDelete(id);

        if (!deleteProduct) {
            res.status(400).json({
                message: "Product was not deleted!",
                success: false
            })
        }

        res.status(200).json({
            message: "Product was deleted!",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
}