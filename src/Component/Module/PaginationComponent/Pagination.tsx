import React, { useState, useEffect } from 'react';
import './pagination.css';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    changeItemsPerPage: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    itemsPerPage,
    totalItems,
    paginate,
    changeItemsPerPage,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(totalItems / itemsPerPage));

    // Update total pages whenever totalItems or itemsPerPage changes
    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }, [totalItems, itemsPerPage]);

    // Ensure current page remains valid when itemsPerPage changes
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
            paginate(totalPages);
        }
    }, [itemsPerPage, currentPage, totalPages, paginate]);

    const getPageRange = (currentPage: number, totalPages: number) => {
        const delta = 3;
        let start = Math.max(1, currentPage - delta);
        let end = Math.min(totalPages, currentPage + delta);

        if (end - start + 1 !== delta * 2 + 1) {
            if (start === 1) {
                end = Math.min(totalPages, start + delta * 2);
            } else {
                start = Math.max(1, end - delta * 2);
            }
        }

        return { start, end };
    };

    const handleClick = (number: number) => {
        setCurrentPage(number);
        paginate(number);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            paginate(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
        }
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        changeItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const { start, end } = getPageRange(currentPage, totalPages);

    if (totalPages <= 1) {
        return null; // Hide the pagination component if totalPages is 0
    }
    return (
        <nav className="pagination-container">
            <div className="items-per-page">
                Show
                {'  '}
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                {'  '}
                items per page
            </div>
            <ul className="pagination-list">
                <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={handlePrevClick} className="pagination-link">
                        &lt;
                    </button>
                </li>
                {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((number) => (
                    <li key={number} className={`pagination-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => handleClick(number)} className="pagination-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={handleNextClick} className="pagination-link">
                        &gt;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
