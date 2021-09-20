import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useGlobalContext } from "../../context";
import axios from "axios";

const LoginModal = () => {
  const { loginModalVisible, toggleLoginModalVisibility } = useGlobalContext();
  const [loginMode, setLoginMode] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const login = () => {
    const data = {
      username: loginUsername,
      password: loginPassword,
    };
    axios.post("http://localhost:8000/auth/signin", data).then((res) => {
      console.log(res.data);
    });
  };
  const signup = () => {
    const data = {
      username: registerUsername,
      password: registerPassword,
    };
    axios.post("http://localhost:8000/auth/signup", data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      {loginModalVisible && (
        <div className="loginModalContainer">
          <div
            className={`loginModal ${
              loginMode ? "loginModal-login" : "loginModal-signup"
            }`}
          >
            <IoCloseOutline
              className="loginModal-closeIcon"
              onClick={toggleLoginModalVisibility}
            />
            <section className="loginSection">
              <div className="loginFormGrp">
                <input
                  type="text"
                  placeholder="username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div className="loginFormGrp">
                <input
                  type="password"
                  placeholder="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button className="loginFormGrp-btn" onClick={login}>
                Login
              </button>
            </section>
            <section className="signupSection">
              <div className="loginFormGrp">
                <input
                  type="text"
                  placeholder="username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </div>
              <div className="loginFormGrp">
                <input
                  type="password"
                  placeholder="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <button className="loginFormGrp-btn" onClick={signup}>
                Sign up
              </button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
