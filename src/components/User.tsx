import React from "react";
import eye from "../assets/eye.jpg";
type chatProp = {};
const User = ({ chat }: any) => {
  console.log("chat", chat);

  return (
    <div className="user">
      <div className="usercontainer">
        <img src={chat[1].userInfo.photoURL} alt="" className="profile" />
        <div className="details">
          <span className="username">{chat[1].userInfo.username}</span>
          <span className="lastmessage">{chat[1].userInfo?.lastmessage}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
