import { createContext, useContext, useState, useEffect } from "react";



export const CartContext = createContext();



export const CartProvider = ({ children }) => {

    const [cart, Setcart] = useState([]);

    useEffect(() => {
        const ExsitingItem = localStorage.getItem('cart');

        if (ExsitingItem) {
            Setcart(JSON.parse(ExsitingItem));
        }
    }, [])

    return (
        <CartContext.Provider value={{ cart, Setcart }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => useContext(CartContext);