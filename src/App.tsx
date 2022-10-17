import reactLogo from "./assets/react.svg";
import React from "react";
import "./App.scss";
import "./Responsive.scss";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

const App = () => {
  const currentUser = useSelector((state: any) => state.currentUser);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={currentUser.username ? <Home /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
