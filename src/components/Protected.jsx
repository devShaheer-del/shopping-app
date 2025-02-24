import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ Component }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(null); // Initialize with null

    useEffect(() => {
        const user = localStorage.getItem("UserName");
        const token = localStorage.getItem("UserToken");

        if (!user || !token) {
            navigate('/Login');
        } else {
            setIsAuth(true);
        }
    }, [navigate]);

    if (isAuth === null) return null; // Wait for auth check
    return isAuth ? <Component /> : null;
}

export default Protected;
