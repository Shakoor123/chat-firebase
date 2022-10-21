import React, { useRef, useEffect } from "react";
import eye from "../assets/eye.jpg";
import { useSelector } from "react-redux";
const Message = ({ m }: any) => {
  const user = useSelector((state: any) => state.currentUser);
  const chat = useSelector((state: any) => state.chatReducer);
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [m]);

  return (
    <div
      className={m.senderId == user.uid ? "message owner" : "message"}
      ref={ref}
    >
      <div className="messageinfo">
        <img
          src={m.senderId == user.uid ? user.photoURL : chat.user.photoURL}
          alt="img"
          className="profile"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <span className="span">{m.text}</span>
        {m.img && (
          <img src={m.img} alt="messageimage" className="messageImage" />
        )}
      </div>
    </div>
  );
};

export default Message;
