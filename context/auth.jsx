import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null
    });

    // Load user data from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        const storedToken = localStorage.getItem("Usertoken");

        if (storedUser && storedToken) {
            setAuth({
                user: JSON.parse(storedUser),
                token: storedToken
            });
        }
    }, []);

    // Whenever auth state changes, update localStorage
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
