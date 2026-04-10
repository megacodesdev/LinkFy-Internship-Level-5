import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Users,
  Settings,
  LogOut,
  X,
  Activity,
} from "lucide-react";
import Modal from "../common/Modal";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ onSidebarToggle, onActivitiesToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileRef = useRef(null);
  const [isAcsOpened, setIsAcsOpened] = useState(false);
  const acsRef = useRef(null);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOut = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsAcsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return () => document.removeEventListener("mousedown", handleClickOut);
  }, []);

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault(e)
    try{
      const response = await logout()
      if(response.status === 200){
        navigate("/login")
      }
    } catch (error){
      navigate(-1)
      console.log("Error while logging out: ", error)
    }
  }

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex items-center justify-between">
        <button
          className="lg:hidden text-gray-600 hover:text-blue-500"
          onClick={onSidebarToggle}
        >
          <Menu className="w-6 h-6" />
        </button>

        <span className="text-blue-500 font-bold text-lg">Admin Panel</span>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center space-x-2 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-40 md:w-60 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-transform"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsAcsOpened(true)}
            className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-transform relative lg:hidden"
            title="Quick Activities"
          >
            <Activity className="h-5 w-5" />
          </button>

          <button className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-transform relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 -translate-y-1 translate-x-1 h-4 w-4 bg-red-500 animate-pulse rounded-full flex justify-center items-center text-white text-[10px]">
              <span> 5</span>
             
            </span>
          </button>

          <div className="relative hover:cursor-pointer" ref={profileRef}>
            <button
              className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors cursor-pointer"></div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform hover:text-blue-500 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-blue-200 animate-fadeIn">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </a>
                <hr className="my-1" />
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {isAcsOpened && (
        <div
          className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-blue-200 animate-fadeIn"
          ref={acsRef}
        >
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </a>
          <hr className="my-1" />
          <a
            href="/"
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </a>
        </div>
      )}
      {isAcsOpened && (
        <div
          className="absolute right-0 top-12 mt-2 w-80 h-[50%] bg-white rounded-md shadow-lg z-10 animate-fadeIn"
          ref={acsRef}
        >
          <div className="relative w-full md:flex-1 h-96 md:h-full rounded-md border bg-white border-gray-300">
            <div className="head w-full h-13 bg-blue-900 rounded-t-md justify-center items-center">
              <span className="flex justify-center items-center translate-y-3 text-white font-semibold">
                <Activity className="text-white text-center flex justify-center items-center" />
                Important Activities
              </span>
            </div>

            <div className="body w-full max-h-[90%] rounded-b-md flex flex-col items-center space-y-2 overflow-y-auto p-2">
              <div
                className="note w-[99%] h-20 bg-gray-200 hover:scale-104 transition-all cursor-pointer rounded-md shrink-0 flex flex-row items-center justify-between"
                onClick={openModal}
              >
                <div className="icon w-[10%] relative left-2">
                  <Bell className="text-yellow-500 translate-x-2" />
                </div>
                <div className="note-body flex flex-col">
                  <span className="text-blue-500 font-semibold">
                    Stock Notification
                  </span>
                  <p className="text-sm text-gray-700">
                    Lorem ipsum, dolor sit amet
                  </p>
                </div>
                <span
                  className="note-delete relative right-0 w-8 h-full text-red-500 flex justify-center items-center hover:bg-red-400 rounded-r-md hover:text-white transition-all"
                >
                  <X className="w-4 h-4 font-semibold" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpened}
        isClosed={closeModal}
        title={"Client Request"}
      />
    </>
  );
};

export default Header;
