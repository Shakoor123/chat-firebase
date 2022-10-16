import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PhotoIcon from "@mui/icons-material/Photo";
import eye from "../../assets/eye.jpg";
import AbcIcon from "@mui/icons-material/Abc";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
const Register = () => {
  const [passwordView, setPasswordView] = useState(false);
  const [fileView, setFileView] = useState(null);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();
  const handleSubmit = async (e: any) => {
    setErr(false);
    e.preventDefault();
    console.log(e.target[0].value);
    const username: string = e.target[0].value;
    const email: string = e.target[1].value;
    const password: string = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(username + email + password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storage = getStorage();
      const storageRef = ref(storage, `${username}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setErr(true);
        },
        async () => {
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            // Add a new document in collection "cities"
            await setDoc(doc(db, "user", res.user.uid), {
              username,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <AbcIcon className="icon" />
            <input type="text" placeholder="username" className="input" />
          </div>
          <div className="inputWrapper">
            <PersonIcon className="icon" />
            <input type="text" placeholder="Email" className="input" />
          </div>
          <div className="inputWrapper">
            <LockOpenIcon className="icon" />
            <input
              type={passwordView ? "text" : "password"}
              placeholder="Password"
              className="input"
            />
            <img
              src={eye}
              onClick={() => {
                if (!passwordView) {
                  setPasswordView(true);
                } else {
                  setPasswordView(false);
                }
              }}
              alt=""
              className="eye"
            />
          </div>
          <div className=" fileWrapper">
            <label htmlFor="file">
              <PhotoIcon className="imageIcon" />
              <span>Select Profile</span>
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e: any) => {
                setFileView(e.target.files[0]);
              }}
              style={{ display: "none" }}
              id="file"
            />
            {fileView && (
              <img
                src={URL.createObjectURL(fileView)}
                alt=""
                style={{ backgroundColor: "yellow" }}
                className="profile"
              />
            )}
          </div>
          {err && <p style={{ color: "yellow" }}>Your inputs are not valid</p>}
          <button className="submit">Register</button>
          <Link to={"/login"}>
            <span className="redirect">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
