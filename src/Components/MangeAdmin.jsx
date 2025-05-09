import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);

  // Fetch Admins
  const getAdmin = async () => {
    try {
      const url = "http://localhost:8080/admin/getAdmin";
      const response = await axios.get(url);
      if (response.data.admin) {
        setAdmins(response.data.admin);
      }
    } catch (error) {
     
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  // Send Credentials Function
  const sendCredentials = async (admin) => {
    try {
     
  
      const url = "http://localhost:8080/admin/sendCredentials";
      const response = await axios.post(url, { email: admin.email });
  
     
  
      if (response.data.success) {
        toast.success("✅ Credentials sent successfully!");
      } else {
        alert("❌ Failed to send credentials.");
      }
    } catch (error) {
     
      alert("❌ Error sending credentials.");
    }
  };


  const handleAdminDelete = async (_id) => {
    try {
      
      const id = _id;
      const url = `http://localhost:8080/admin/AdminDelete/${id}`;
      const response = axios.delete(url);
       if(response){
        toast.success("Admin Delete Successfully");
       }
      
    } catch (error) {
     
    }
  }
  

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Admins</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span
                      className={`badge ${admin.role === "Super Admin" ? "bg-danger" : "bg-primary"
                        }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => sendCredentials(admin)}
                    >
                      Send Credentials
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={(e) => handleAdminDelete(admin._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No admins found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdmin;
