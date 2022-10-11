import React from "react";
import eye from "../assets/eye.jpg";
import User from "./User";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="topbar">
        <div className="wrapper">
          <span className="logo">ChatApp</span>
          <img src={eye} alt="" className="profile" />
          <span className="username">shakoorcbk</span>
          <button className="logout">LogOut</button>
        </div>
      </div>
      <input type="text" className="search" placeholder="find a user" />
      <div className="users">
        <User />
        <User />

        <User />
        <User />

        <User />

        <User />

        <User />
        <User />

        <User />
        <User />
      </div>
    </div>
  );
};

export default Sidebar;
