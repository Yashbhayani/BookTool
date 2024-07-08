import React, { useEffect, useState } from 'react'
import './book.css';

const Book = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = sessionStorage.getItem("token");
        return token !== null && token !== undefined && token !== "";
    });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(token !== null && token !== undefined && token !== "");
    }, [isLoggedIn]);
    return (
        <div className="body-container">
            <div className="grid-container">
                <div className="department main-book-image">
                    <h2>Main Book Image</h2>
                </div>
                <div className="department book-details">
                    <h2>Book Details</h2>
                </div>
            </div>
        </div>
    )
}

export default Book
