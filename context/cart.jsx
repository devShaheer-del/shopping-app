import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./auth"; // ✅ Import AuthContext

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const { auth } = useAuth(); // ✅ Get auth state
    const [cart, setCart] = useState([]);

    // ✅ Function to get cart from localStorage based on user
    const loadUserCart = (username) => {
        if (username) {
            const storedCart = localStorage.getItem(`cart_${username}`);
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    };

    // ✅ Load cart when user logs in
    useEffect(() => {
        if (auth.user) {
            console.log(`Loading cart for user: ${auth.user.username}`); // Debugging log
            setCart(loadUserCart(auth.user.username));
        } else {
            setCart([]); // 🔥 Reset cart if no user is logged in
        }
    }, [auth.user]); // Runs only when user changes

    // ✅ Save cart to localStorage when cart changes
    useEffect(() => {
        if (auth.user) {
            console.log(`Saving cart for user: ${auth.user.username}`, cart); // Debugging log
            localStorage.setItem(`cart_${auth.user.username}`, JSON.stringify(cart));
        }
    }, [cart, auth.user]); // Runs when cart or user changes

    // ✅ Clear cart on logout
    const clearCartOnLogout = () => {
        console.log("User logged out, clearing cart...");
        setCart([]);
    };

    return (
        <cartContext.Provider value={{ cart, setCart, clearCartOnLogout }}>
            {children}
        </cartContext.Provider>
    );
};

export const useCart = () => useContext(cartContext);
