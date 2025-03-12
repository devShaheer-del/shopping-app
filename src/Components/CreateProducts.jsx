import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function CreateProducts() {
    const [product, setProduct] = useState({
        ProductName: '',
        ProductCategory: '',
        ProductPrize: '',
        photo: null,
        InStock: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Product Data:', product);

        try {
            const url = "http://localhost:8080/createProduct/AddProducts";

            // Use FormData for file upload
            const formData = new FormData();
            formData.append("productName", product.productName);
            formData.append("productCategory", product.productCategory);
            formData.append("productPrice", product.productPrice);
            formData.append("productImage", product.productImage); // File
            formData.append("inStock", product.inStock);

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200) {
                toast.success("Product Added Successfully");
            } else {
                toast.error("Product was not added");
            }
        } catch (error) {
            console.log('Something went wrong', error);
            toast.error("An error occurred while adding the product.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "80vh" }}>
            <div className="card shadow-lg p-4" style={{ width: "50%" }}>
                <h2 className="text-center mb-4">Create Product</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" name="ProductName" value={product.productName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Category</label>
                        <input type="text" className="form-control" name="ProductCategory" value={product.productCategory} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Price</label>
                        <input type="number" className="form-control" name="ProductPrize" value={product.productPrice} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <input type="file" className="form-control" name="photo" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">In Stock</label>
                        <input type="text" className="form-control" name="InStock" value={product.inStock} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProducts;
