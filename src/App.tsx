import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate, createBrowserRouter } from "react-router-dom";
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
import Category from "./Component/MainComponent/Setting/CategoryComponent/Category";
import SubCategory from "./Component/MainComponent/Setting/SubCategoryComponent/SubCategory";
import AddProduct from "./Component/MainComponent/Setting/ProductComponent/AddProductComponent/AddProduct";

function App() {
  const [loading, setLoading] = useState(false); // State to manage loading state

  const LogState = useSelector((state: unknown) => (state as any).statues);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    console.log(LogState)
    if (token) {
      action.Login(true);
    } else {
      action.Login(false);
    }
    console.log(LogState)
  }, []);

  return (
    <BrowserRouter>
      <div>
        {!LogState && (
          <Routes>
            <Route path="/login" element={<Login setLoading={setLoading} />} />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        )}
      </div>
      <div>
        {LogState && (
          <div className="container-fluid position-fixed">
            <div className="row flex-nowrap">
              <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <Header setLoading={setLoading} />
                </div>
              </div>
              <div className="col py-3">
                <Routes>
                  <Route
                    path="/"
                    element={<Home setLoading={setLoading} />}
                  />
                  <Route path="/product" element={<ListProduct setLoading={setLoading} />} />
                  <Route path="/product/save" element={<AddProduct setLoading={setLoading} />} />
                  <Route path="/category" element={<Category setLoading={setLoading} />} />
                  <Route path="/subcategory" element={<SubCategory setLoading={setLoading} />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/book/:id" element={<Book />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/user/:id" element={<User />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <div className="spinner-container">
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000 }}>
            <BallTriangle
              height={80}
              width={80}
              color="#07f2fa"
              ariaLabel="loading"
            />
          </div>
        </div>
      ) : null}
      <Toaster position="top-right" reverseOrder={true} />
    </BrowserRouter>
  );
}

export default App;
