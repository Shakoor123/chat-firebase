import React from "react";
import eye from "../assets/eye.jpg";
const User = () => {
  return (
    <div className="user">
      <div className="usercontainer">
        <img src={eye} alt="" className="profile" />
        <div className="details">
          <span className="username">john Done</span>
          <span className="lastmessage">okey bye</span>
        </div>
      </div>
    </div>
  );
};

export default User;
