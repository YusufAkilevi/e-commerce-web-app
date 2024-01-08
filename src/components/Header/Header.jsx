import * as React from "react";
import MuiButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
  faCircleUser,
  faList,
  faCircleXmark,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../logo.svg";
import MainNavigation from "./MainNavigation";
import { useSelector, useDispatch } from "react-redux";

import Button from "../UI/Button";

// slices
import { fetchSearchProductData } from "../../redux/slices/product/searchProductsSlice";
import { signOutAsync } from "../../redux/slices/auth/signOutSlice.js";
const Header = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [showProfile, setShowProfile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      dispatch(fetchSearchProductData(inputRef.current.value));
      inputRef.current.value = "";
      navigate("/search");
    }
  };
  const toggleProfileHandler = () => {
    setShowProfile((prevState) => !prevState);
  };
  const toggleCategoriesHandler = () => {
    setShowCategories((prevState) => !prevState);
  };
  const location = useLocation();
  const windowWidth = window.innerWidth;

  useEffect(() => {
    if (
      (location.pathname === "/signin" && windowWidth < 640) ||
      (location.pathname === "/cart" && windowWidth < 640) ||
      (location.pathname === "/my-orders" && windowWidth < 640)
    ) {
      if (showProfile) toggleProfileHandler();
    }
  }, [location]);
  const hideProfileClasses =
    "flex sm:flex-row flex-col sm:justify-between sm:items-center gap-x-4 sm:static sm:top-auto sm:right-auto sm:translate-x-0 absolute top-0 right-full  transition-all duration-300";
  const showProfileClasses =
    "flex sm:flex-row flex-col sm:justify-between sm:items-center justify-center items-center gap-5 z-20  gap-x-4 sm:static sm:top-auto sm:right-auto full absolute top-0 bg-white sm:h-auto h-screen sm:w-auto w-full transition-all duration-300";

  const handleSignOut = () => {
    dispatch(signOutAsync());
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-y-10 shadow-lg  sm:px-8 md:py-5 md:px-28 ">
      <div className="sm:flex sm:justify-around sm:items-center pt-2 sm:pt-6 grid items-center justify-items-center grid-cols-3 overflow-x-hidden">
        {showCategories && (
          <Button
            onClick={toggleCategoriesHandler}
            className="justify-self-end mr-2 border-none p-0 sm:hidden z-30 absolute top-2 left-2"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#4361EE" }}
              size="2xl"
            />
          </Button>
        )}
        {!showCategories && (
          <Button
            onClick={toggleCategoriesHandler}
            className="ml-2 justify-self-start border-none p-0 sm:hidden"
          >
            <FontAwesomeIcon
              icon={faList}
              style={{ color: "#4361EE" }}
              size="2xl"
            />
          </Button>
        )}
        <div className="w-12">
          <Link to="/">
            <img className="w-full" src={Logo} alt="logo" />
          </Link>
        </div>
        {showProfile && (
          <Button
            onClick={toggleProfileHandler}
            className="justify-self-end mr-2 border-none p-0 sm:hidden z-30"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#4361EE" }}
              size="2xl"
            />
          </Button>
        )}
        {!showProfile && (
          <Button
            onClick={toggleProfileHandler}
            className="justify-self-end mr-2 border-none p-0 sm:hidden"
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{ color: "#4361EE" }}
              size="2xl"
            />
          </Button>
        )}

        <form
          onSubmit={submitHandler}
          className="flex justify-between items-center sm:w-1/2 rounded col-span-full mx-2"
        >
          <div className="flex justify-center items-center py-2 w-full mx-2 relative">
            <div className="px-2 absolute left-0">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#8490a9" }}
              />
            </div>
            <div className="w-full">
              <input
                ref={inputRef}
                type="text"
                className="pl-8 p-2 w-full rounded border border-gray-400 outline-[#4361EE] outline-1"
              />
            </div>
          </div>
          <div>
            <button className="bg-[#4361EE] hover:bg-[#7b90f3]  text-white rounded p-2 font-semibold">
              Search
            </button>
          </div>
        </form>

        <div className={showProfile ? showProfileClasses : hideProfileClasses}>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <PopupState variant="popover" popupId="user-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <MuiButton
                      style={{ backgroundColor: "#4361EE" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      {user.email}
                    </MuiButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/my-orders");
                        }}
                      >
                        My Orders
                      </MenuItem>
                      <MenuItem onClick={handleSignOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Sign out
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          ) : (
            <Link
              to="/signin"
              className="border flex items-center justify-center gap-x-3 p-4 px-5 py-2 overflow-hidden text-white transition duration-300 ease-out rounded shadow-xl group bg-[#4361EE] hover:bg-[#7b90f3] font-semibold"
            >
              <FontAwesomeIcon icon={faUser} style={{ color: "#fff" }} />
              Sign In
            </Link>
          )}

          <Link
            to="/cart"
            className=" border flex items-center justify-center gap-x-3 p-4 px-5 py-2 overflow-hidden text-white transition duration-300 ease-out rounded shadow-xl group bg-[#4361EE] hover:bg-[#7b90f3] font-semibold"
          >
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "#fff" }} />
            Cart
            {cart && (
              <span className="bg-[#6981f1]  rounded-lg px-2">
                {cart.totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
      <MainNavigation
        isCategoriesShown={showCategories}
        toggleCategories={toggleCategoriesHandler}
      />
    </div>
  );
};
export default Header;
