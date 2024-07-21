import React, { useState } from "react";
import Productcontex from "./ProductContext";
import { producturl, categoryurl, subcategoryurl, productcodeurl, saveproducturl} from "../API/ApiRouter";


const ProductState = (props) => {
    const ProductFunction = async (report) => {
        try {
            let jsonString = JSON.stringify(report);
            let reportParam = encodeURIComponent(jsonString);
            let urlWithParams = `${producturl}?report=${reportParam}`;
            const response = await fetch(urlWithParams, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("token")
                }
            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    const CategoryFunction = async (report) => {
        try {
            let jsonString = JSON.stringify(report);
            let reportParam = encodeURIComponent(jsonString);
            let urlWithParams = `${categoryurl}?report=${reportParam}`;
            const response = await fetch(urlWithParams, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("token")
                }
            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    const SubCategoryFunction = async (report) => {
        try {
            let jsonString = JSON.stringify(report);
            let reportParam = encodeURIComponent(jsonString);
            let urlWithParams = `${subcategoryurl}?report=${reportParam}`;
            const response = await fetch(urlWithParams, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("token")
                }
            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };


    const ProductCodeFunction = async (code) => {
        try {
            let urlWithParams = `${productcodeurl}?code=${code}`;
            const response = await fetch(urlWithParams, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("token")
                }
            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    const SaveProductFuncation = async(formdata)=>{
        try {
            const response = await fetch(saveproducturl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("token")
                },
                body: JSON.stringify(formdata),

            });
            const json = await response.json();
            return json;
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }


    return (
        <Productcontex.Provider
            value={{
                ProductFunction,
                CategoryFunction,
                SubCategoryFunction,
                ProductCodeFunction,
                SaveProductFuncation
            }}
        >
            {props.children}
        </Productcontex.Provider>
    );
}
export default ProductState;