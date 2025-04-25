import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { toast } from 'react-hot-toast';
const CheckOut = () => {
    const { cart } = useCart();

    const [user, Setuser] = useState({
        name: "",
        email: ""
    });

    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const data = localStorage.getItem('User');
        if (data) {
            const Userdata = JSON.parse(data);
            Setuser({
                name: Userdata.name || "",
                email: Userdata.email || ""
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            customer_name: user.name,
            customer_email: user.email,
            customer_address: formData.address,
            customer_phone: formData.phone,
            customer_card: formData.cardNumber,
            customer_expire: formData.expiryDate,
            customer_cvv: formData.cvv,
            cartItems: cart,

        };

        try {
            const res = await fetch("http://localhost:8080/orders/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Order Placed Successfully");

            } else {
                toast.error("Order was Placed Successfully")
            }
        } catch (err) {
            console.error("Order error:", err);
            alert("Something went wrong!");
        }
    };

    const totalprize = cart.reduce((sum, item) => sum + Number(item.ProductPrize), 0);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Billing Information</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={user.name}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <h4 className="card-title mb-4">Payment Information</h4>
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiration Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">Submit Payment</button>
                                    <button type="button" className="btn btn-outline-secondary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            {
                                cart?.map((value, index) => (
                                    <ul className="list-group list-group-flush" key={index}>
                                        <li className="list-group-item">{`Item: ${value.ProductName} - Price: ${value.ProductPrize}`}</li>
                                    </ul>
                                ))
                            }
                            <div className="mt-3 d-flex justify-content-between">
                                <strong>Total:</strong>
                                <span>{`$ ${totalprize}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
