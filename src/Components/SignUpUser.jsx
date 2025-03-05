import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function SignUpUser() {
    const [Users, SetUsers] = useState([]);
    const calledOnce = useRef(false);

    const getUser = async () => {
        try {
            const url = "http://localhost:8080/user/getUsers";
            const response = await axios.get(url);

            console.log("API Response:", response.data); // ✅ Debugging API response

            // If API returns an object with "users" array, update accordingly
            if (response.data && Array.isArray(response.data.users)) {
                SetUsers(response.data.users);
            } else if (Array.isArray(response.data)) {
                SetUsers(response.data);
            } else {
                console.error("Unexpected API response format");
            }
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    };

    useEffect(() => {
        if (!calledOnce.current) {
            getUser();
            calledOnce.current = true;
        }
    }, []);

    // Debugging state update
    useEffect(() => {
        console.log("Updated Users State:", Users);
    }, [Users]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Registered Users</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.length > 0 ? (
                        Users.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SignUpUser;
