import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function ContactUsers() {
    const [contact, setContact] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 5; // Number of users per page
    const pagesVisited = pageNumber * usersPerPage;

    const getContacts = async () => {
        try {
            const url = "http://localhost:8080/contact/getContacts";
            const response = await axios.get(url);

            if (response.data && Array.isArray(response.data.contacts)) {
                setContact(response.data.contacts);
            }
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    // Slice data for pagination
    const displayUsers = contact
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item, index) => (
            <tr key={index}>
                <td>{pagesVisited + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
            </tr>
        ));

    // Handle page change
    const pageCount = Math.ceil(contact.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Contacted Users</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers.length > 0 ? displayUsers : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No contacts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Component */}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination justify-content-center"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
            />
        </div>
    );
}

export default ContactUsers;
