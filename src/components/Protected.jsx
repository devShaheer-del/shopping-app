import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ Component }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("UserName");
            const token = localStorage.getItem("UserToken");

            if (!user || !token) {
                navigate('/Login');
            } else {
                setIsAuth(true);
            }
        }
    }, [navigate]);

    return isAuth ? <Component /> : null;
}

export default Protected;
