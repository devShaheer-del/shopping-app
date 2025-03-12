import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function AddCategory() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCategory = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/category/AddCategory";
            const response = await axios.post(url, { title, description });

            if (response.data) {
                toast.success("Category Added Successfully");
                setTitle(""); // Clear input after success
                setDescription("");
            }
        } catch (error) {
            toast.error("Failed to add category!");
            console.error("Error:", error);
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            {/* Add Category Form */}
            <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
                <h3 className='text-center text-success mb-3'>Add Category Here!</h3>
                <form onSubmit={handleCategory}> {/* ✅ Fix: onSubmit on Form */}
                    <div className="mb-3">
                        <label htmlFor="categoryTitle" className="form-label">Category Title</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="categoryTitle" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Category Description</label>
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="categoryDescription" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Category</button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
