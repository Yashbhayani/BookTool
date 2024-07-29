import React, { useState } from "react";
import Productcontex from "./ProductContext";
import {
    producturl, categoryurl, subcategoryurl, categorycodeurl, select_category_list,
    select_product_list, productcodeurl, saveproducturl, categorycodepath,
    savecategoryurl
} from "../API/ApiRouter";


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

    const CategoryCodeFunction = async (code) => {
        try {
            let urlWithParams = `${categorycodeurl}?code=${code}`;
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

    const CategoryPathFunction = async (path) => {
        try {
            let urlWithParams = `${categorycodepath}?code=${path}`;
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


    const SelectCategoryListFunction = async (Pid) => {
        try {
            let urlWithParams = `${select_category_list}?pid=${Pid}`;
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

    const SaveProductFuncation = async (formdata) => {
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

    const SelectProductListFunction = async () => {
        try {
            const response = await fetch(select_product_list, {
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

    const SaveCategoryFuncation = async (formdata) => {
        try {
            const response = await fetch(savecategoryurl, {
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
                SaveProductFuncation,
                SelectProductListFunction,
                CategoryCodeFunction,
                CategoryPathFunction,
                SelectCategoryListFunction,
                SaveCategoryFuncation
            }}
        >
            {props.children}
        </Productcontex.Provider>
    );
}
export default ProductState;