import React, { useContext, useEffect, useState } from 'react';
import HomeContext from '../../../../../Context/Home/HomeContext';
import { useNavigate } from 'react-router-dom';
import Authcontex from '../../../../../Context/Auth/AuthContext';
import Productcontex from '../../../../../Context/Product/ProductContext';
import { debounce, upperCase } from 'lodash';
import { DebounceInput } from 'react-debounce-input';

const AddProduct = (props: any) => {
    const context = useContext(Authcontex);
    const Productcontext = useContext(Productcontex);
    const { CheckuserFunction } = context;
    const { ProductCodeFunction } = Productcontext;
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        code: '',
        name: '',
    });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token !== null && token !== undefined && token !== "") {
        } else {
            navigate('/login');
        }
    }, []); // Empty dependency array ensures this runs only on mount

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if fields are empty
        if (!code.trim() || !name.trim()) {

            if (!code.trim()) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    code: 'Code is required',
                }));
            }

            if (!name.trim()) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: 'Name is required',
                }));
            }
            return;
        }

        if (!name.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Name is required',
            }));
            return;
        }
        // Handle form submission logic here
        console.log("Code:", code);
        console.log("Name:", name);

        // Reset errors after successful submission
        setErrors({
            code: '',
            name: '',
        });

        // Optionally, you can close the form after submission
        // setShowForm(false);
    };

    const CheckCode = async (value:any) => {
        const response = await ProductCodeFunction(value);
        if(response.data){
            setErrors((prevErrors) => ({
                ...prevErrors,
                code: '',
            }));
            props.setLoading(false);
        }else{
            setErrors((prevErrors) => ({
                ...prevErrors,
                code: 'Code is Alredy added',
            }));
            props.setLoading(false);
        }
    }

    const handleCodeChange = (e:any) => {
        const {value} = e.target;
        setCode(value.toUpperCase());
        props.setLoading(true);
        CheckCode(value.toUpperCase())
    };

    const handleNameChange = (e:any) => {
        e.preventDefault();
        const { value } = e.target;
        setName(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: '',
        }));
    };


    return (
        <div>
            <h4>Add Product</h4>
            <hr />
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="inputCode" className="form-label">Code</label>
                    <DebounceInput
                    type="text"
                    minLength={3}
                    debounceTimeout={300}
                    className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                    id="inputCode"
                    value={code.toUpperCase()}
                    onChange={handleCodeChange}
                    />
                    {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="inputName"
                        value={name}
                        onChange={handleNameChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddProduct;
