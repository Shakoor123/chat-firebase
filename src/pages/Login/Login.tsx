import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import eye from "../../assets/eye.jpg";
const Login = () => {
  const [passwordView, setPasswordView] = useState(false);
  return (
    <div className="register">
      <div className="registerWrapper">
        <span className="title">Login</span>
        <form>
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
          <button className="submit">Login</button>
          <Link to={"/register"}>
            <span className="redirect">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
