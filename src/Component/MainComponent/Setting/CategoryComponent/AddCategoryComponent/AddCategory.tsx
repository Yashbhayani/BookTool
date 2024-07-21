import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Authcontex from '../../../../../Context/Auth/AuthContext';
import Productcontex from '../../../../../Context/Product/ProductContext';

const AddCategory = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const context = useContext(Authcontex);
    const Productcontext = useContext(Productcontex);
    const { CheckuserFunction } = context;

    return (
    <div>
        <h4>AddCategory</h4>
        <hr/>
    </div>
)
}

export default AddCategory