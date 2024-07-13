import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SubCategory = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token !== null && token !== undefined && token !== "") {
        } else {
            navigate('/login');
        }
    }, []); // Empty dependency array ensures this runs only on mount
    return (
        <div>
            <h4>SubCategory</h4>
        </div>
    )
}

export default SubCategory