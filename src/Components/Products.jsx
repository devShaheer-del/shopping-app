import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 10;

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/createProduct/getAllProducts";
            const response = await axios.get(url);

            if (response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                console.error("Unexpected response format", response.data);
            }
        } catch (error) {
            console.log(`Something went wrong: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };


    const handleDeleteProduct = async (_id) => {
        try {

            const id = _id;

            const url = `http://localhost:8080/createProduct/deleteProduct/${id}`;
            await axios.delete(url);

            toast.success("Product Deleted Successfully");
            //   window.location.href = '/allCategory'

        } catch (error) {
            toast.error(error);
        }
    }

    const offset = currentPage * productsPerPage;
    const currentProducts = products.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(products.length / productsPerPage);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((item, index) => (
                                <tr key={index}>
                                    <td>{offset + index + 1}</td>
                                    <td>
                                        {item.ProductImage ? (
                                            <img src={item.ProductImage} alt={item.productName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{item.ProductName || 'N/A'}</td>
                                    <td>{item.ProductCategory || 'N/A'}</td>
                                    <td>${item.ProductPrize || 'N/A'}</td>
                                    <td>
                                        <span className={`badge ${item.InStock ? 'bg-success' : 'bg-danger'}`}>
                                            {item.InStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td><button className='btn btn-danger' onClick={(e) => handleDeleteProduct(item._id)}>Remove Product</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-danger fs-4">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}

export default Products;
