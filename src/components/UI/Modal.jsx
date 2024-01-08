import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faUser } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";
import PaymentForm from "../Cart/PaymentForm";
const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-30 bg-black bg-opacity-75"
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="fixed top-[10vh] sm:top-[20vh] left-1/2 -translate-x-1/2 w-11/12  sm:w-1/2 z-40 bg-white overflow-hidden p-10 rounded">
      <Button
        className="border-none absolute -right-2 top-0"
        onClick={props.onClose}
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{ color: "#4361EE" }}
          size="2xl"
        />
      </Button>
      {isAuthenticated && <PaymentForm onClose={props.onClose} />}
      {!isAuthenticated && (
        <div>
          <p className="font-semibold text-xl text-center mb-8">
            In order to place an order, you need to Sign In!
          </p>
          <Link
            to="/signin"
            className="border flex items-center justify-center gap-x-3 p-4 px-5 py-2 overflow-hidden text-white transition duration-300 ease-out rounded shadow-xl group bg-[#4361EE] hover:bg-[#7b90f3] font-semibold"
          >
            <FontAwesomeIcon icon={faUser} style={{ color: "#fff" }} />
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Modal;
