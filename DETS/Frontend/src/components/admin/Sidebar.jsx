import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  MessageCircle,
  Users as UsersIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaToolbox, FaTools } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const sidebarRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        onClose(); // Close mobile menu when resizing to desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`
        bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
        fixed top-[50px] left-0 h-[calc(100vh-50px)] z-50
        ${isOpen ? "w-64" : "w-0"} // Hidden on mobile unless opened
        ${!isMobile && collapsed ? "lg:w-20" : "lg:w-64"} // Desktop behavior
        ${!isMobile ? "lg:static" : ""} // Static position on desktop
      `}
    >
      {/* Header (Desktop Collapse Toggle) */}
      <div className="flex items-center p-4 border-b border-gray-200">
        {(!collapsed || isMobile) ? (
          <div className="w-full flex items-center justify-between">
            {/* {(!collapsed || isMobile) && ( // Only show logo when expanded or on mobile
              <span className="absolute text-xl font-bold text-gray-700">DETS</span>
            )} */}
            {!isMobile && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-500 hover:text-blue-500"
              >
                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex justify-center text-gray-500 hover:text-blue-500"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="py-4 flex-grow overflow-y-auto">
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          to="/home"
          collapsed={collapsed}
          isMobile={isMobile}
          isOpen={isOpen}
          active={true}
        />
        <NavItem
          icon={<MessageCircle size={20} />}
          label="Messages"
          to="/messages"
          collapsed={collapsed}
          isMobile={isMobile}
          isOpen={isOpen}
        />
        <NavItem
          icon={<UsersIcon size={20} />}
          label="Stock"
          to="/stock"
          collapsed={collapsed}
          isMobile={isMobile}
          isOpen={isOpen}
        />
      </div>

      {/* Smart Admin Section - Hidden on mobile when collapsed */}
      {(!isMobile || isOpen) && (
        <div className="mt-auto pb-4">
          {(!collapsed || isMobile) && (
            <div className="flex items-center justify-between px-4 mb-2">
              <span className="text-xs font-semibold text-gray-500">
                SMART ADMIN
              </span>
              <Plus className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          )}
          <SmartNavItem
            icon={<FaTools className="w-4 h-4 text-gray-600"/>}
            label="Equipments"
            active
            collapsed={collapsed}
            isMobile={isMobile}
            to="/admin/equipments"
          />
          <SmartNavItem
            icon={<Settings className="w-5 h-5 text-gray-600"/>}
            label="Settings"
            collapsed={collapsed}
            isMobile={isMobile}
            to="/admin/settings"
          />
        </div>
      )}
    </div>
  );
};

// NavItem Component
const NavItem = ({ icon, label, to, collapsed, isMobile, isOpen, active }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-3 hover:bg-gray-200 font-semibold transition-all cursor-pointer group ${active ? "bg-blue-100" : ""}`}
  >
    <div className={`text-gray-500 group-hover:text-blue-600`}>{icon}</div>
    {((isMobile && isOpen) || !collapsed) && (
      <span className={`ml-3 text-gray-500 group-hover:text-blue-600`}>
        {label}
      </span>
    )}
  </Link>
);

// SmartNavItem Component
const SmartNavItem = ({ icon, to, label, active, collapsed, isMobile }) => (
  <Link to={to}>
    <div
      className={`flex items-center px-4 py-2 rounded-lg mx-2 mb-1 cursor-pointer ${
        active ? "bg-blue-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="mr-3">{icon}</div>
      {(!collapsed || isMobile) && (
        <span className={`text-sm ${active ? "text-blue-600" : "text-gray-700"}`}>
          {label}
        </span>
      )}
    </div>
  </Link>
);

export default Sidebar;