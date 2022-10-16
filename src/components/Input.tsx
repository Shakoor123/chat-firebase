import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const Input = () => {
  return (
    <>
      <div className="input">
        <div className="inputWrapper">
          <input
            type="text"
            className="messageInput"
            placeholder="Type something"
          />
          <div className="rightSide">
            <AddPhotoAlternateIcon />
            <button className="sendButton">send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
