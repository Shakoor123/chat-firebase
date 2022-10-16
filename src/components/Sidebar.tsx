import React, { useEffect, useState } from "react";
import eye from "../assets/eye.jpg";
import User from "./User";
import { useDispatch } from "react-redux";
import { addCurrentUser, reset } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { addChat } from "../redux/chatSlice";

type sidebarProp = {
  currentUser: any;
};
type currentUserType = {
  username: string;
  photoURL: string;
  uid: string;
};
const Sidebar = (currentUser: sidebarProp) => {
  const user: currentUserType = currentUser.currentUser;
  const [searchUser, setSearchUser] = useState("");
  const [searchedUser, setsearchedUser] = useState(null);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const db = getFirestore();
  const handleKey = (e: { code: string }) => {
    setsearchedUser(null);
    e.code == "Enter" && handleSearch();
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "user"),
      where("username", "==", searchUser)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        if (!doc.data().photoURL) {
          setErr(true);
        }
        return setsearchedUser(doc.data());
      });
    } catch (eror) {
      setErr(true);
      console.log(eror);
    }
  };

  const handleLogout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const handleSelect = async () => {
    const combinedId: string =
      user.uid > searchedUser.uid
        ? user.uid + searchedUser.uid
        : searchedUser.uid + user.uid;
    try {
      const res: any = await getDoc(doc(db, "chats", combinedId));

      if (!res.exist) {
        //create new chat
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", searchedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            username: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: searchedUser.uid,
            username: searchedUser.username,
            photoURL: searchedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
      setsearchedUser(null);
      setSearchUser("");
    }
    setsearchedUser(null);
    setSearchUser("");
  };

  // chats mapp section

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc: any) => {
        setChats(doc.data());
        return () => {
          unsub();
        };
      });
    };
    user.uid && getChats();
  }, [user.uid]);

  const handleChat = (chat: any) => {
    const combinedId: string =
      user.uid > chat[1].userInfo.uid
        ? user.uid + chat[1].userInfo.uid
        : chat[1].userInfo.uid + user.uid;
    dispatch(addChat({ chatId: combinedId, user: chat[1].userInfo }));
  };

  return (
    <div className="sidebar">
      <div className="topbar">
        <div className="wrapper">
          <span className="logo">ChatApp</span>
          <img src={user.photoURL} alt="" className="profile" />
          <span className="username">{user.username}</span>
          <button className="logout" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>
      <input
        type="text"
        onKeyDown={handleKey}
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
        }}
        className="search"
        placeholder="find a user"
      />
      {err && (
        <span
          style={{
            color: "blue",
            marginLeft: 90,
          }}
        >
          User Not Found
        </span>
      )}
      <div className="users">
        {searchedUser && (
          <div
            className="user"
            style={{ backgroundColor: "lightgray" }}
            onClick={handleSelect}
          >
            <div className="usercontainer">
              <img src={searchedUser.photoURL} alt="" className="profile" />
              <div className="details">
                <span className="username">{searchedUser.username}</span>
                <span className="lastmessage">okey bye</span>
              </div>
            </div>
          </div>
        )}
        {Object.entries(chats).map((chat: any) => (
          <User key={chat} chat={chat} onClick={handleChat(chat)} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
