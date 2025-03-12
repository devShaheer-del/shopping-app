import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const UpdateCategory = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const url = `http://localhost:8080/category/getCategoryById/${id}`;
                const response = await axios.get(url);
                setTitle(response.data.data.title); // ✅ Fix: Properly accessing response
                setDescription(response.data.data.description);
            } catch (error) {
                console.error(`Error fetching category: ${error}`);
            }
        };

        if (id) {
            fetchCategory();
        }
    }, [id]); // ✅ Fix: Added `id` as dependency

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8080/category/updateCategoryById/${id}`;
            await axios.put(url, { title, description });

            toast.success("Category Updated Successfully")
            setTitle("");
            setDescription("");

            

        } catch (error) {
            console.error(`Error updating category: ${error}`);
            alert("Failed to update category.");
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
                <h3 className='text-center text-success mb-3'>Update Category Here!</h3>
                <form onSubmit={handleSubmit}> {/* ✅ Fix: Added onSubmit */}
                    <div className="mb-3">
                        <label htmlFor="categoryTitle" className="form-label">Category Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // ✅ Fix: Added onChange
                            className="form-control"
                            id="categoryTitle"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Category Description</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} // ✅ Fix: Added onChange
                            className="form-control"
                            id="categoryDescription"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Update Category</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategory;
