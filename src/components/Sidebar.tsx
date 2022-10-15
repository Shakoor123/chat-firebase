import React from "react";
import eye from "../assets/eye.jpg";
import User from "./User";
type sidebarProp = {
  currentUser: any;
};
type currentUserType = {
  username: string;
  photoURL: string;
  uid: string;
};
const Sidebar = (currentUser: sidebarProp) => {
  const user: currentUserType = currentUser.currentUser;
  console.log(user);

  return (
    <div className="sidebar">
      <div className="topbar">
        <div className="wrapper">
          <span className="logo">ChatApp</span>
          <img src={user.photoURL} alt="" className="profile" />
          <span className="username">{user.username}</span>
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
