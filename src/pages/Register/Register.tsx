import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PhotoIcon from "@mui/icons-material/Photo";
import eye from "../../assets/eye.jpg";
import AbcIcon from "@mui/icons-material/Abc";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Register = () => {
  const [passwordView, setPasswordView] = useState(false);
  const [fileView, setFileView] = useState(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const username: string = e.target[0].value;
    const email: string = e.target[1].value;
    const password: string = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(username + email + password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
