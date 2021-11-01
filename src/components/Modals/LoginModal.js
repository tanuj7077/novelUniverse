import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import axios from "axios";

const LoginModal = () => {
  const { loginModalVisible, toggleLoginModalVisibility, login, signup } =
    useGlobalContext();
  const [loginMode, setLoginMode] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [usernameExistance, setUsernameExistance] = useState(false);

  const checkUsernameExistance = () => {
    axios
      .get(`http://localhost:8000/user/checkUser/${registerUsername}`)
      .then((res) => {
        console.log(res.data);
        setUsernameExistance(res.data.usernameExistance);
      });
  };

  const toggleLoginMode = () => {
    setLoginMode(!loginMode);
  };

  useEffect(() => {
    checkUsernameExistance();
  }, [registerUsername]);
  return (
    <>
      {loginModalVisible && (
        <div className="loginModalContainer">
          <div
            className="loginModalContainer-overlay"
            onClick={toggleLoginModalVisibility}
          ></div>
          <div
            className={`loginModalContainer-loginModal ${
              loginMode
                ? "loginModalContainer-loginModal-login"
                : "loginModalContainer-loginModal-signup"
            }`}
          >
            <IoCloseOutline
              className="loginModalContainer-loginModal-closeIcon"
              onClick={toggleLoginModalVisibility}
            />
            <div className="loginModalContainer-loginModal-optionBg">
              <p
                className="loginModalContainer-loginModal-optionBg-login"
                onClick={toggleLoginMode}
              >
                <span>Register</span>
              </p>
              <p
                className="loginModalContainer-loginModal-optionBg-register"
                onClick={toggleLoginMode}
              >
                <span>Login</span>
              </p>
            </div>

            <section
              className={`loginModalContainer-loginModal-loginSection ${
                loginMode
                  ? "loginModalContainer-loginModal-loginSectionVisible"
                  : ""
              }`}
            >
              <p className="loginModalContainer-loginModal-loginSection-heading">
                Login
              </p>
              <div className="loginModalContainer-loginModal-loginSection-form">
                <div className="loginFormGrp">
                  <div className="loginFormGrp-input">
                    <FaUserAlt className="loginFormGrp-input-icon" />
                    <input
                      type="loginFormGrp-text"
                      placeholder="Username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="" className="loginFormGrp-input-label">
                      Username
                    </label>
                  </div>
                </div>
                <div className="loginFormGrp">
                  <div className="loginFormGrp-input">
                    <FaKey className="loginFormGrp-input-icon" />
                    <input
                      className="loginFormGrp-text"
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="" className="loginFormGrp-input-label">
                      Password
                    </label>
                  </div>
                </div>
                <button
                  className="loginFormGrp-btn"
                  onClick={() => login(loginUsername, loginPassword)}
                >
                  Login
                </button>
              </div>
            </section>

            <section
              className={`loginModalContainer-loginModal-signupSection ${
                !loginMode
                  ? "loginModalContainer-loginModal-loginSectionVisible"
                  : ""
              }`}
            >
              <p className="loginModalContainer-loginModal-loginSection-heading">
                Register
              </p>
              <div className="loginModalContainer-loginModal-loginSection-form">
                <div className="loginFormGrp">
                  <div className="loginFormGrp-input">
                    <FaUserAlt className="loginFormGrp-input-icon" />
                    <input
                      type="loginFormGrp-text"
                      placeholder="Username"
                      value={registerUsername}
                      onChange={(e) => {
                        setRegisterUsername(e.target.value);
                      }}
                      required
                    />
                    <label htmlFor="" className="loginFormGrp-input-label">
                      Username
                    </label>

                    {usernameExistance && (
                      <p className="loginFormGrp-input-msg-error">
                        username already exist
                      </p>
                    )}
                    {!usernameExistance && registerUsername.length > 0 && (
                      <p className="loginFormGrp-input-msg-success">
                        username available
                      </p>
                    )}
                  </div>
                </div>
                <div className="loginFormGrp">
                  <div className="loginFormGrp-input">
                    <FaKey className="loginFormGrp-input-icon" />
                    <input
                      className="loginFormGrp-text"
                      type="password"
                      placeholder="Password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="" className="loginFormGrp-input-label">
                      Password
                    </label>
                  </div>
                </div>
                {!(
                  usernameExistance ||
                  registerPassword.length <= 2 ||
                  registerUsername.length === 0
                ) && (
                  <button
                    className={`loginFormGrp-btn`}
                    onClick={() => signup(registerUsername, registerPassword)}
                  >
                    Register
                  </button>
                )}
                {(usernameExistance ||
                  registerPassword.length <= 2 ||
                  registerUsername.length === 0) && (
                  <button
                    className={`loginFormGrp-btn loginFormGrp-btn-disabled `}
                    onClick={() => console.log("Hey")}
                  >
                    Register
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
