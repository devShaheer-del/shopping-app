import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {

    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("UserName");
        const token = localStorage.getItem("UserToken");

        if (!user && token) {
            navigate('/About');
        }
    }, [])

    return (
        <div>

            <Component />

        </div>
    )
}

export default Protected