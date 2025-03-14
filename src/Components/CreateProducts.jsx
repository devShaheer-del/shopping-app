import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
function CreateProducts() {
    const [product, setProduct] = useState({
        ProductName: "",
        ProductCategory: "",
        ProductPrize: "",
        photo: null,
        InStock: ""
    });

    const [category, setCategory] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            const result = await axios.get("http://localhost:8080/category/getCategories");
            if (Array.isArray(result.data)) {
                setCategory(result.data);
            } else if (result.data && Array.isArray(result.data.category)) {
                setCategory(result.data.category);
            }
        } catch (error) {
            console.error("API Fetch Error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProduct({
            ...product,
            [name]: type === "file" ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ProductName", product.ProductName);
        formData.append("ProductCategory", product.ProductCategory);
        formData.append("ProductPrize", product.ProductPrize);
        formData.append("photo", product.photo);
        formData.append("InStock", product.InStock);

        try {
            const response = await axios.post("http://localhost:8080/createProduct/AddProducts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 201) {
                // alert("Product Created Successfully!");
                toast.success("Product Created Successfully!")
            } else {
                // alert("Failed to create product.");
                toast.error("Failed to create product.")
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the product.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "80vh" }}>
            <div className="card shadow-lg p-4" style={{ width: "50%" }}>
                <h2 className="text-center mb-4">Create Product</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" name="ProductName" value={product.ProductName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Category</label>
                        <select className="form-select" name="ProductCategory" value={product.ProductCategory} onChange={handleChange} required>
                            <option value="">Select Category</option>
                            {category.map((value, index) => (
                                <option key={index} value={value.title}>{value.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Price</label>
                        <input type="number" className="form-control" name="ProductPrize" value={product.ProductPrize} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <input type="file" className="form-control" name="photo" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">In Stock</label>
                        <input type="number" className="form-control" name="InStock" value={product.InStock} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProducts;
