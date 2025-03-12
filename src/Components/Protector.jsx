import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protector({ Component }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("AdminName");

        if (!token) {
            navigate('/'); // Redirect to login if no token
        }
    }, [navigate]); // Run only on mount

    return <Component />;
}

export default Protector;
