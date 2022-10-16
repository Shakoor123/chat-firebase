import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = ({ chatId }: any) => {
  const [messages, setMessages] = useState([]);
  const db = getFirestore();

  console.log(chatId);
  useEffect(() => {
    const getCha = () => {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc: any) => {
        if (doc.exists()) {
          setMessages(doc.data().messages);
        }
      });
      return () => {
        unsub();
      };
    };
    getCha();
  }, [chatId]);
  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message />
      ))}
    </div>
  );
};

export default Messages;
