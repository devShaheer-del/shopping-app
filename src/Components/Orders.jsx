import axios from "axios";
import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("Here is your Orders!");


  const getOrders = async () => {
    try {
      const url = "http://localhost:8080/orders/get-orders";
      const response = await axios.get(url);

     // Check if orders data is being received correctly

      const orderList = response.data?.orders;  // Make sure 'orders' is the correct field

      if (response.data.success && Array.isArray(orderList)) {
        setOrders(orderList);
      } else {
        setMessage("No orders found");
      }
    } catch (error) {
   
      setMessage("Something went wrong while fetching orders.");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">{message}</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Order Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_email}</td>
                  <td>{order.customer_phone}</td>
                  <td>{order.customer_address}</td>
                  <td>
                    {order.cartItems && Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
                      <select className="form-select">
                        <option value="">Cutomer Items</option>
                        {order.cartItems.map((item, idx) => (
                          <option key={idx} value={item._id}>
                            {item.ProductName} - ${item.ProductPrize} {/* Displaying name and price */}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>No items available</p>
                    )}
                  </td>
                  <td>
                    <select className="form-select" defaultValue={order.status || "Processing"}>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
