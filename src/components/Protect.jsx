import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Protect(props) {

    const { Component } = props;
    const navigate = useNavigate();


    useEffect(() => {

        const user = localStorage.getItem('UserName');
        const token = localStorage.getItem('Usertoken');


        if (!token && user) {
            navigate('/Login');
        }

    }, [])

    return (
        <>


            <Component />



        </>
    )
}

export default Protect