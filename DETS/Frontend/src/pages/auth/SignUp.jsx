import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaMailBulk, FaPhone, FaUserShield } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../components/contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const {login, setAuthState}  = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const registerImages = [
    { src: "/images/5000fa1f-82e2-4cc7-8429-e9379dbaa51e.jpeg" },
    { src: "/images/b19d9bd2-eeb2-4531-80cb-93470e09051d.jpeg" },
    { src: "/images/Creative Signs and Designs - Electrical, Monument….jpeg" },
  ];

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await login(formData);
      
      // Redirect based on role
      if (response.user.role === "Admin") {
        navigate("/home");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      console.error("Log In error:", error);
      setServerMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setServerMessage(""), 6000);
    }
  };
  

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* LEFT SIDE */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 flex flex-col justify-center items-center p-6 text-white">
        <div className="app-logo flex items-center mb-6 w-18 h-18 relative">
          <span className="text-5xl font-bold translate-x-22">DETS</span>
        </div>
        <p className="text-xl text-center mb-8 font-light">
          Welcome to Digital Equipment Tracking System
        </p>

        {/* <div className="relative w-full h-80 md:h-[450px] rounded-xl overflow-hidden shadow-2xl">
          {registerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 scale-100 z-30" : "opacity-0 scale-95 z-10"
              }`}
            >
              <img
                src={image.src}
                alt="Slide"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div> */}
      </div>

      {/* RIGHT SIDE - FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 flex flex-col justify-center px-8 md:px-12 py-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">DETS | Login</h2>

        <AnimatePresence mode="wait">
            <motion.div
              key="step1"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <label className="flex items-center text-gray-300 font-semibold mb-1">
                  <FaUser className="mr-2" /> Email | Username
                </label>
                <input
                  type="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 active:bg-none"
                  placeholder="System User | systemuser@gmail.com"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <label className="flex items-center text-gray-300 font-semibold mb-1">
                  <FaLock className="mr-2" /> Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Password"
                  required
                />
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-sm text-blue-600 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </p>
              </div>
            </motion.div>

        </AnimatePresence>

        {message && <p className="text-red-500 text-sm mb-2">{message}</p>}
        {serverMessage && <p className="text-red-500 text-sm mb-2">{serverMessage}</p>}

        <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-auto"
            >
              {loading ? "Enrolling..." : "Enroll"}
            </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          New to DETS System?{" "}
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
