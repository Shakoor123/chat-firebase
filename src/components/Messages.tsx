import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = ({ chatId }: any) => {
  const [messages, setMessages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const getCha = async () => {
      const unsub = await onSnapshot(doc(db, "chats", chatId), (doc: any) => {
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

  return (
    <div className="messages">
      {messages.map((m: any) => (
        <Message m={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
