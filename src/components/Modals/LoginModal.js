import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useGlobalContext } from "../../context";

const LoginModal = () => {
  const { loginModalVisible, toggleLoginModalVisibility } = useGlobalContext();
  return (
    <>
      {loginModalVisible && (
        <div className="loginModal">
          <IoCloseOutline
            className="loginModal-closeIcon"
            onClick={toggleLoginModalVisibility}
          />
        </div>
      )}
      ;
    </>
  );
};

export default LoginModal;
