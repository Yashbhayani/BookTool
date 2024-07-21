import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Component/AuthComponent/Login";
import Header from "./Component/Module/Header/Header";
import { Toaster } from "react-hot-toast";
import Home from "./Component/MainComponent/HomeComponet/Home";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./Redux";
import { BallTriangle } from "react-loader-spinner"; // Import the spinner component
import "./App.css"; // Import your custom CSS file
import Dashboard from "./Component/MainComponent/DashboardComponent/Dashboard";
import Book from "./Component/MainComponent/BookComponent/Book";
import Books from "./Component/MainComponent/BooksComponent/Books";
import User from "./Component/MainComponent/UserComponent/User";
import Users from "./Component/MainComponent/UsersComponent/Users";
import ListProduct from "./Component/MainComponent/Setting/ProductComponent/ListProductComponent/ListProduct";
import ListCategory from "./Component/MainComponent/Setting/CategoryComponent/ListCategoryComponent/ListCategory";
import ListSubCategory from "./Component/MainComponent/Setting/SubCategoryComponent/ListSubCategoryComponent/ListSubCategory";
import AddProduct from "./Component/MainComponent/Setting/ProductComponent/AddProductComponent/AddProduct";
import path from "path";
import AddCategory from "./Component/MainComponent/Setting/CategoryComponent/AddCategoryComponent/AddCategory";

function App() {
  const [loading, setLoading] = useState(false);
  const LogState = useSelector((state: any) => state.statues); // Assuming `state.statues` is correct
  const dispatch = useDispatch();
  const { Login: loginAction } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const fetchData = async () => {
      let token = sessionStorage.getItem("token");
      if (token) {
        loginAction(true); // Dispatch action to update login state
      } else {
        loginAction(false); // Dispatch action to update login state
      }
    };
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: LogState ? <Navigate to='/' /> : <Login setLoading={setLoading} />,
    },
    {
      path: '/',
      element: (
        <Header setLoading={setLoading}>
          <Home setLoading={setLoading} />
        </Header>
      ),
    },
    {
      path: '/product',
      element: (
        <Header setLoading={setLoading}>
          <ListProduct setLoading={setLoading} />
        </Header>
      ),
    },
    {
      path: '/product/save',
      element: (
        <Header setLoading={setLoading}>
          <AddProduct setLoading={setLoading} />
        </Header>
      ),
    },
    {
      path: '/category',
      element: (
        <Header setLoading={setLoading}>
          <ListCategory setLoading={setLoading} />
        </Header>
      ),
    },
    {
      path: '/category/save',
      element: (
        <Header setLoading={setLoading}>
          <AddCategory setLoading={setLoading} />
        </Header>
      ),
    },
    {
      path: '/subcategory',
      element: (
        <Header setLoading={setLoading}>
          <ListSubCategory setLoading={setLoading} />
        </Header>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <Header setLoading={setLoading}>
          <Dashboard />
        </Header>
      ),
    },
    {
      path: '/books',
      element: (
        <Header setLoading={setLoading}>
          <Books />
        </Header>
      ),
    },
    {
      path: '/book/:id',
      element: (
        <Header setLoading={setLoading}>
          <Book />
        </Header>
      ),
    },
    {
      path: '/users',
      element: (
        <Header setLoading={setLoading}>
          <Users />
        </Header>
      ),
    },
    {
      path: '/user/:id',
      element: (
        <Header setLoading={setLoading}>
          <User />
        </Header>
      ),
    },
    {
      path: '*',
      element: (
        <Navigate to="/" />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
          <div className="spinner-container">
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000 }}>
              <BallTriangle
                height={80}
                width={80}
                radius={5}
                color="#07f2fa"
                ariaLabel="loading"
                visible={loading}
              />
            </div>
          </div>
          <div className="overlay" style={{ display: loading ? 'block' : 'none' }}></div>
          <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}

export default App;
