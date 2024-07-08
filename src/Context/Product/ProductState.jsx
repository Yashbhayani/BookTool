import React, { useState } from "react";
import Productcontex from "./ProductContext";
import { producturl } from "../API/ApiRouter";


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

    return (
        <Productcontex.Provider
            value={{
                ProductFunction
            }}
        >
            {props.children}
        </Productcontex.Provider>
    );
}
export default ProductState;