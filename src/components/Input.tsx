import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useSelector } from "react-redux";
import {
  updateDoc,
  doc,
  getFirestore,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(false);
  const user = useSelector((state: any) => state.currentUser);
  const chat = useSelector((state: any) => state.chatReducer);
  const db = getFirestore();
  const storage = getStorage();

  // console.log("inside input", user, chat);

  const messageSend = async (e: any) => {
    e.preventDefault();
    if (text == "" && img == null) {
      alert("please text something or select an image");
    } else if (img) {
      const storageRef = ref(storage, `${uuid()}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {
          setErr(true);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //after upload
            await updateDoc(doc(db, "chats", chat.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            setImg(null);
            setText("");
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chat.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [chat.chatId + ".lastMessage"]: {
          text,
        },
        [chat.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", chat.user.uid), {
        [chat.chatId + ".lastMessage"]: {
          text,
        },
        [chat.chatId + ".date"]: serverTimestamp(),
      });

      setImg(null);
      setText("");
    }
  };
  return (
    <>
      <form className="input" onSubmit={messageSend}>
        <div className="inputWrapper">
          <input
            type="text"
            className="messageInput"
            placeholder="Type something"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div className="rightSide">
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <AddPhotoAlternateIcon style={{ color: "blue" }} />
              )}
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e: any) => setImg(e.target.files[0])}
              id="file"
              style={{ display: "none" }}
            />
            {text === "" && img == null ? (
              <button
                className="sendButton"
                style={{ cursor: "not-allowed" }}
                onClick={messageSend}
              >
                send
              </button>
            ) : (
              <button className="sendButton">send</button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Input;
