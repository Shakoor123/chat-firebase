import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import eye from "../../assets/eye.jpg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [passwordView, setPasswordView] = useState(false);
  const [err, setErr] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    setErr(false);
    e.preventDefault();
    const email: string = e.target[0].value;
    const password: string = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
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
          {err && (
            <p style={{ color: "yellow" }}>wrong user email or password</p>
          )}
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
