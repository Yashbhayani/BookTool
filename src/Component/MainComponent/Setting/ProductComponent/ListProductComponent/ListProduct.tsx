import React, { useContext, useEffect, useState } from 'react'
import './production.css'
import Authcontex from '../../../../../Context/Auth/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Productcontex from '../../../../../Context/Product/ProductContext';
import Pagination from '../../../../Module/PaginationComponent/Pagination';
import { IProductModel } from '../../../../../models/productionmodel';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../Redux';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const initialProductList: IProductModel[] = [];
const ListProduct = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const context = useContext(Authcontex);
    const Productcontext = useContext(Productcontex);
    const { CheckuserFunction } = context;
    const { ProductFunction } = Productcontext;
    const [Checkuser, setTCheckuser] = useState(Boolean);
    const [searchTerm, setSearchTerm] = useState('');

    const action = bindActionCreators(actionCreators, dispatch);
    const [productList, setProductList] = useState<IProductModel[]>([]);
    const [loading, setLoading] = useState(true);

    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0); // Assuming totalItems is a number

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            CallCheckuser(); // Await the Checkuser function
        } else {
            action.Login(true);
        }
    }, []); // Empty dependency array ensures this runs only on mount



    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const changeItemsPerPage = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage);
    };

    const CallCheckuser = async () => {
        props.setLoading(true);
        try {
            const response = await CheckuserFunction();
            if (response.Success === true) {
                console.log(response)
                if (!response.data) {
                    props.setLoading(false);
                } else {
                    CallProduct();
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
            })
            return false;
        }
    }

    const CallProduct = async () => {
        props.setLoading(true);
        try {
            let jsonObject = {
                reversestatus: 0, //orer by
                qpara: "id", // order type
                searchKey: "", //serch
                onset_val: currentPage - 1, //limit
                offset_val: itemsPerPage // perpage record
            };

            let response = await ProductFunction(jsonObject);
            console.log(response)
            if (response.Success) {
                setTotalItems(response.data.productCount);
                setProductList(response.data.productModels);
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
            })
            props.setLoading(false);
        }
    }


    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const addProduct = () => {
        navigate('/product/save');
    }


    return (
        <div>
            <div className="navbar navbar-light">
                <div className="container-fluid">
                    <button className="btn btn-outline-primary" type="button" onClick={addProduct}>Add</button>
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="button">Search</button>
                    </div>
                </div>
            </div>

            <table className="m-3 table">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Active</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((product, index) => (
                        <tr key={product.pid}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>
                                {product.active ? (
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

                                </div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                paginate={paginate}
                changeItemsPerPage={changeItemsPerPage}
            />
        </div >
    )
}

export default ListProduct