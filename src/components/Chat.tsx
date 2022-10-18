import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Messages from "./Messages";
import Input from "./Input";
import { useSelector } from "react-redux";

const Chat = () => {
  const chat = useSelector((state: any) => state.chatReducer);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="username">{chat && chat.user.username}</span>
        <div className="chatIcons">
          <VideocamIcon />
          <PersonAddIcon />
          <MoreVertIcon />
        </div>
      </div>
      <Messages chatId={chat.chatId} />
      {chat.chatId != "" && <Input />}
    </div>
  );
};

export default Chat;
