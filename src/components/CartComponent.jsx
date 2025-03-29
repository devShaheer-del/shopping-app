import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/cart';
import Products from './Products';

const CartComponent = () => {
    const [logedUser, setLogedUser] = useState("");
    const { cart } = useCart(); // ✅ Using context directly

    useEffect(() => {
        // ✅ Fetch user data from localStorage
        const auth = localStorage.getItem('User');
        if (auth) {
            try {
                const parsedata = JSON.parse(auth);
                console.log(parsedata)
                if (parsedata) {
                    setLogedUser(parsedata.name);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    return (
        <div className="container" style={{ minHeight: '70vh', width: 'auto' }}>
            <h4 className='text-center text-success mt-2 p-10'>Hello Mr {logedUser}</h4>
            <p>
                {cart.length > 0
                    ? `You have ${cart.length} item(s) in your cart`
                    : "Your cart is Empty"}
            </p>

            {/* ✅ Display Products */}
            <div className="container">
                {cart.length > 0 ? (
                    <div className="row">
                        {cart.map((product, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card mb-3 shadow">
                                    <img 
                                        src={product.ProductImage} 
                                        className="card-img-top" 
                                        alt={product.ProductName} 
                                        style={{ height: "200px", objectFit: "cover" }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.ProductName}</h5>
                                        <p className="card-text">Price: ${product.ProductPrize}</p>
                                        
                                        <button className="btn btn-danger">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted">No products in cart.</p>
                )}
            </div>
        </div>
    );
};

export default CartComponent;
