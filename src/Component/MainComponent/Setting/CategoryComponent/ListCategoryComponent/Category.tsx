import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Authcontex from '../../../../../Context/Auth/AuthContext';
import Productcontex from '../../../../../Context/Product/ProductContext';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../Redux';
import { ICategoryModel } from '../../../../../models/productionmodel';
import toast from 'react-hot-toast';
import Pagination from '../../../../Module/PaginationComponent/Pagination';

const Category = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const context = useContext(Authcontex);
    const Productcontext = useContext(Productcontex);
    const { CheckuserFunction } = context;
    const { CategoryFunction } = Productcontext;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(''); // Column to sort by
    const [sortOrder, setSortOrder] = useState(0);
    const action = bindActionCreators(actionCreators, dispatch);
    const [categoryList, setCategoryList] = useState<ICategoryModel[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(100);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token !== null && token !== undefined && token !== "") {
            CallCheckuser(); // Await the Checkuser function
        } else {
            navigate('/login');
            action.Login(true);
        }
    }, []);

    const onPageChange = (page: any) => {
        setCurrentPage(Number(page));
        CallCategory(page, itemsPerPage, sortBy, sortOrder);
    };


    const onchangeItemsPerPage = (iPerPage: any) => {
        const newItemsPerPage = Number(iPerPage);
        setItemsPerPage(newItemsPerPage)
        CallCategory(1, newItemsPerPage, sortBy, sortOrder)
    };

    const CallCheckuser = async () => {
        props.setLoading(true);
        try {
            const response = await CheckuserFunction();
            if (response.Success === true) {
                if (!response.data) {
                    props.setLoading(false);
                } else {
                    await CallCategory(currentPage, itemsPerPage, sortBy, sortOrder);
                }
            } else {
                props.setLoading(false);
            }
        } catch {
            toast.error("Server is not working", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 2000,
            });
            return false;
        }
    };

    const CallCategory = async (cP: any, iP: number, sB:string, sO:number) => {
        props.setLoading(true);

        try {
            let jsonObject = {
                reversestatus: sO, // order by
                qpara: sB, // order type
                searchKey: searchTerm, // search
                onset_val: (cP - 1) * iP, // offset
                offset_val: iP // limit
            };

            console.log(jsonObject);
            let response = await CategoryFunction(jsonObject);
            if (response.Success) {
                setTotalRecords(response.data.categoryCount);
                setCategoryList(response.data.categoryTypeModels);
                props.setLoading(false);
            } else {
                props.setLoading(false);
            }
        } catch {
            toast.error("Server is not working", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 2000,
            });
            props.setLoading(false);
        }
    };

    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const addCategory = () => {
        navigate('/product/save');
    };

    const searchData= ()=>{
        CallCategory(1, itemsPerPage, sortBy, sortOrder)
    }

        // Function to toggle sorting order
    const toggleSortOrder = () => {
        setSortOrder(sortOrder  === 0 ? 1 : 0);
    };

    const handleSort =async (columnName:any) => {
        if (sortBy === columnName) {
            toggleSortOrder();
        } else {
            setSortBy(columnName);
            setSortOrder(0);
        }
        await CallCategory(currentPage, itemsPerPage, columnName, sortOrder);
    };


    return (
        <div>
            <h4>Category</h4>
            <hr/>
            <div className="navbar navbar-light">
                <div className="container-fluid">
                    <button className="btn btn-outline-primary" type="button" onClick={addCategory}>Add</button>
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange}/>
                        <button className="btn btn-outline-success" type="button" onClick={searchData}>Search</button>
                    </div>
                </div>
            </div>
            <table className="m-3 table">
                <thead className="table-primary">
                    <tr>
                        <th scope="col" onClick={() => handleSort('id')}>
                            # {sortBy === 'id' && <span>{sortOrder === 0 ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}</span>}
                        </th>
                        <th scope="col" onClick={() => handleSort('CategoryName')}>
                            Product Name {sortBy === 'CategoryName' && <span>{sortOrder === 0 ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}</span>}</th>
                        <th scope="col">Category Code</th>
                        <th scope="col" onClick={() => handleSort('CategoryPath')}>
                            Category Path {sortBy === 'CategoryPath' && <span>{sortOrder === 0 ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}</span>}
                            </th>
                        <th scope="col" onClick={() => handleSort('CategoryValue')}>
                            Category Value {sortBy === 'CategoryValue' && <span>{sortOrder === 0 ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}</span>}
                            </th>
                        <th scope="col" onClick={() => handleSort('Active')}>
                            Active {sortBy === 'Active' && <span>{sortOrder === 0 ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}</span>}
                        </th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList && categoryList.map((category, index) => (
                        <tr key={category.id}>
                            <th scope="row">{(currentPage - 1) * itemsPerPage + (index + 1)}</th>
                            <td>{category.productName}</td>
                            <td>{category.categoryCode}</td>
                            <td>{category.categoryPath}</td>
                            <td>{category.categoryValue}</td>
                            <td>
                                {category.isActive ? (
                                    <span role="img" aria-label="Active">&#128994;</span>
                                ) : (
                                    <span role="img" aria-label="Inactive">&#128308;</span>
                                )}
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button type="button" className="btn btn-outline-warning m-2">
                                                <span className="bi bi-pencil-square"></span> Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="btn btn-outline-danger m-2">
                                                <span className="bi bi-trash"></span> Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                recordsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                onchangeItemsPerPage={onchangeItemsPerPage} // Correct prop name
            />

        </div>
    )
}

export default Category;
