import React, { useState } from "react";
import { useCart } from "../../context/cart";
const CheckOut = () => {


    const { cart } = useCart();

    const [order, Setorder] = useState(cart); 
    
    const totalprize = order.reduce((sum,item) => sum + Number(item.ProductPrize),0);

    console.log(order);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Billing Information</h4>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        rows="3"
                                        placeholder="Enter your address"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
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
                                        placeholder="1234 5678 9876 5432"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiration Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiryDate"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        name="cvv"
                                        placeholder="123"
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
                                cart?.map((value) => {
                                    return (
                                        <>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{`item ${value.ProductName} - Prize is ${value.ProductPrize}`}</li>
                                            </ul>

                                        </>
                                    )
                                })
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
