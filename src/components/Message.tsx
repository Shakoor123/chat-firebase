import React from "react";
import eye from "../assets/eye.jpg";
const Message = () => {
  return (
    <div className="message owner">
      <div className="messageinfo">
        <img src={eye} alt="img" className="profile" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <span className="span">hello hi evide aann </span>
        <img src={eye} alt="messageimage" className="messageImage" />
      </div>
    </div>
  );
};

export default Message;
