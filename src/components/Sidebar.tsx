import React, { useState } from "react";
import eye from "../assets/eye.jpg";
import User from "./User";
import { useDispatch } from "react-redux";
import { addCurrentUser, reset } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doc, getFirestore, setDoc } from "firebase/firestore";

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
          console.log(doc.data());

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
          <div className="user" style={{ backgroundColor: "lightgray" }}>
            <div className="usercontainer">
              <img src={searchedUser.photoURL} alt="" className="profile" />
              <div className="details">
                <span className="username">{searchedUser.username}</span>
                <span className="lastmessage">okey bye</span>
              </div>
            </div>
          </div>
        )}

        <User />
      </div>
    </div>
  );
};

export default Sidebar;
