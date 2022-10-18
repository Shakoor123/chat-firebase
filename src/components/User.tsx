import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import eye from "../assets/eye.jpg";
import { addChat } from "../redux/chatSlice";
type currentUserType = {
  username: string;
  photoURL: string;
  uid: string;
};
const User = ({ chat }: any) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const user: currentUserType = currentUser;
  const dispatch = useDispatch();
  const handleChats = async () => {
    const combinedId: string =
      user.uid > chat[1].userInfo.uid
        ? user.uid + chat[1].userInfo.uid
        : chat[1].userInfo.uid + user.uid;
    await dispatch(addChat({ chatId: combinedId, user: chat[1].userInfo }));
  };

  return (
    <div className="user" onClick={handleChats}>
      <div className="usercontainer">
        <img src={chat[1].userInfo.photoURL} alt="" className="profile" />
        <div className="details">
          <span className="username">{chat[1].userInfo.username}</span>
          <span className="lastmessage">{chat[1].lastMessage?.text}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
