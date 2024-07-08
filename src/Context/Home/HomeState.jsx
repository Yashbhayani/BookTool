import React, { useState } from "react";
import HomeContext from "./HomeContext";
import { dashboardurl } from "../API/ApiRouter";

const HomeState = (props) => {
    const [book, setbook] = useState(true);
    const DashboardFunction = async () => {
        const response = await fetch(dashboardurl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": sessionStorage.getItem("token")
            },
        });
        const json = await response.json();
        return json;
    };
    return (
        <HomeContext.Provider
            value={{
                DashboardFunction
            }}
        >
            {props.children}
        </HomeContext.Provider>
    );
}
export default HomeState;