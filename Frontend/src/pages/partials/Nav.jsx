import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Login from "../Login";
import Signup from "../Signup";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asynclogout } from "../../store/actions/userAction";
import { toast } from "react-toastify";

const Nav = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { pathname } = useLocation();

  const isAdmin = useSelector((store) => store.user?.user?.isAdmin);
  const { isLoggedIn } = useSelector((store) => store.user);

  const filterHandler = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const loginHandler = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const signupHandler = () => {
    setIsSignupVisible(!isLoginVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleOutsideClick = (e) => {
    if (
      !document.querySelector(".menu").contains(e.target) &&
      !document.querySelector(".menu-handler").contains(e.target)
    ) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await dispatch(asynclogout());
    toast.success("Logout Success");
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-10">
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-lg"></div>
          
          {/* Main navigation content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to={"/"} className="flex items-center space-x-2">
                <img
                  draggable="false"
                  className="h-10 w-auto"
                  src="/images/logo.png"
                  alt="Logo"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-[#b17f44] to-[#d4a76a] bg-clip-text text-transparent">
                  HotelOps
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {isLoggedIn && (
                  <Link
                    to={"/property/create"}
                    className="text-sm font-medium text-gray-700 hover:text-[#b17f44] transition-colors relative group"
                  >
                    Add Property
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b17f44] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to={"/admin-panel/users"}
                    className="text-sm font-medium text-gray-700 hover:text-[#b17f44] transition-colors relative group"
                  >
                    Admin Panel
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b17f44] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}

                {/* Language Selector */}
                <div className="relative group">
                  <button className="text-gray-600 hover:text-[#b17f44] transition-colors">
                    <i className="ri-global-line text-xl"></i>
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg py-2 px-3 hidden group-hover:block">
                    <div className="text-sm text-gray-700 hover:text-[#b17f44] cursor-pointer py-1">English</div>
                    <div className="text-sm text-gray-700 hover:text-[#b17f44] cursor-pointer py-1">Español</div>
                    <div className="text-sm text-gray-700 hover:text-[#b17f44] cursor-pointer py-1">Français</div>
                  </div>
                </div>

                {/* Filters Button */}
                {pathname === "/" && (
                  <button
                    onClick={filterHandler}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-[#b17f44] hover:text-white hover:border-[#b17f44] transition-all duration-300"
                  >
                    Filters
                  </button>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors menu-handler"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#b17f44] to-[#d4a76a] flex items-center justify-center">
                      <i className="ri-user-3-fill text-white"></i>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                      isMenuVisible ? "opacity-100 visible" : "opacity-0 invisible"
                    } menu`}
                  >
                    {isLoggedIn ? (
                      <>
                        <Link to={"/profile"}>
                          <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                            <i className="ri-user-line"></i>
                            <span>My Profile</span>
                          </div>
                        </Link>
                        <div
                          onClick={logoutHandler}
                          className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2 cursor-pointer"
                        >
                          <i className="ri-logout-box-line"></i>
                          <span>Logout</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={signupHandler}
                          className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2 cursor-pointer"
                        >
                          <i className="ri-user-add-line"></i>
                          <span>Sign Up</span>
                        </div>
                        <div
                          onClick={loginHandler}
                          className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2 cursor-pointer border-t border-gray-100"
                        >
                          <i className="ri-login-box-line"></i>
                          <span>Log In</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add margin to the main content to prevent navbar overlap */}
      <div className="h-16"></div>

      {isFilterVisible && (
        <Filter display={isFilterVisible} setDisplay={setIsFilterVisible} />
      )}
      {isLoginVisible && (
        <Login display={isLoginVisible} setDisplay={setIsLoginVisible} />
      )}
      {isSignupVisible && (
        <Signup display={isSignupVisible} setDisplay={setIsSignupVisible} />
      )}
    </>
  );
};

export default Nav;
