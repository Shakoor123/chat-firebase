import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const Input = () => {
  const [text, setText] = useState("");
  const messageSend = () => {
    console.log(text);
  };
  return (
    <>
      <div className="input">
        <div className="inputWrapper">
          <input
            type="text"
            className="messageInput"
            placeholder="Type something"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <form className="rightSide">
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              <AddPhotoAlternateIcon />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
            <button className="sendButton" onClick={messageSend}>
              send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Input;
