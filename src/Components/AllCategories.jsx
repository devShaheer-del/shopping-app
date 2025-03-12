import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function AllCategories() {
  const [category, setCategory] = useState([]); // Ensure it's an empty array initially

  const getCategory = async () => {
    try {
      const url = "http://localhost:8080/category/getCategories";
      const result = await axios.get(url);

      console.log("Full API Response:", result.data); // Check API response

      if (result.data && Array.isArray(result.data.category)) {
        setCategory(result.data.category); // ✅ Correct property
      } else {
        console.log("Data is not in expected array format:", result.data);
      }
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };



  useEffect(() => {
    getCategory();
  }, []);


  const handleDeleteCategory = async (_id) => {
    try {

      const id = _id;

      const url = `http://localhost:8080/category/deleteCategoryById/${id}`;
      await axios.delete(url);

      toast.success("Category Deleted Successfully");
      window.location.href = '/allCategory'

    } catch (error) {

    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Categories</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((value, index) => (
            <tr key={index}>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>
                <Link to={`/UpdateCatgory/${value._id}`} className="btn btn-warning me-2">Edit</Link>
                <button className="btn btn-danger" onClick={(e) => handleDeleteCategory(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCategories;
