import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // Load user data from localStorage on first mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("User");
            const storedToken = localStorage.getItem("Usertoken");

            // Check if both user and token exist and are valid JSON
            if (storedUser && storedToken) {
                setAuth({
                    user: JSON.parse(storedUser), // Parse user data safely
                    token: storedToken
                });
            }
        } catch (error) {
            console.error("Error loading user data from localStorage:", error);
        }
    }, []);

    // Update localStorage when auth changes
    useEffect(() => {
        if (auth.user && auth.token) {
            localStorage.setItem("User", JSON.stringify(auth.user));
            localStorage.setItem("Usertoken", auth.token);
        } else {
            localStorage.removeItem("User");
            localStorage.removeItem("Usertoken");
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
