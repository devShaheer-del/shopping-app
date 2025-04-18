import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { Link } from "react-router-dom";

const CartComponent = () => {
    const [logedUser, setLogedUser] = useState("");
    const { cart, Setcart } = useCart();

    useEffect(() => {
        const authName = localStorage.getItem("UserName");
        if (authName) {
            setLogedUser(authName);
        }
    }, []);

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.ProductPrize), 0);


    const RemoveItem = (id) => {
        try {
            const myCart = [...cart];
            let index = myCart.findIndex(item => item._id === id);
            myCart.splice(index, 1);
            Setcart(myCart);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container py-4" style={{ minHeight: "70vh", width: "auto" }}>
            <h4 className="text-center text-success mb-4">
                Hello {logedUser ? `Mr ${logedUser}` : "Guest"}
            </h4>

            <div className="container mb-4">
                {logedUser ? (
                    <p className="text-center text-muted">
                        Mr {logedUser}, you have {cart.length} item{cart.length !== 1 && "s"} in your cart.
                    </p>
                ) : (
                    <p className="text-center text-danger">
                        You are not logged in. Please log in to view your cart.
                    </p>
                )}
            </div>

            <div className="row">
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow-sm h-100">
                                <img
                                    src={item.ProductImage}
                                    className="card-img-top"
                                    alt={item.ProductName}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.ProductName}</h5>
                                    <p className="card-text">Category: {item.ProductCategory}</p>
                                    <p className="card-text text-success fw-bold">
                                        Price: ${item.ProductPrize}
                                    </p>
                                    <button className="btn btn-danger" onClick={() => RemoveItem(item._id)}>Remove Item</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">Your cart is currently empty.</p>
                )}
            </div>

            {cart.length > 0 && (
                <div className="checkout mt-5 p-4 border-top">
                    <h5 className="text-end text-primary">Total: ${totalPrice.toFixed(2)}</h5>
                    <div className="text-end">
                        <Link to="/CheckOut" className="btn btn-success mt-2">
                            Proceed to Checkout
                        </Link >
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartComponent;
