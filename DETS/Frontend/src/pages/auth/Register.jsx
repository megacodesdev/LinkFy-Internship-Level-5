import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaMailBulk,
  FaPhone,
  FaUserShield,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../components/contexts/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, setAuthState } = useAuth();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [viewConfPassword, setViewConfPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const registerImages = [
    { src: "/images/5000fa1f-82e2-4cc7-8429-e9379dbaa51e.jpeg" },
    { src: "/images/b19d9bd2-eeb2-4531-80cb-93470e09051d.jpeg" },
    { src: "/images/Creative Signs and Designs - Electrical, Monument….jpeg" },
  ];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % registerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.username || !formData.email)) {
      setMessage("Please fill in all fields.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    if (step === 2 && (!formData.password || !formData.confirmPassword)) {
      setMessage("Please fill in both password fields.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    if (step === 2 && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { confirmPassword, ...payload } = formData;

    try {
      const { user, token, message } = await register(payload); // Destructure user + token

      // Save token
      localStorage.setItem("token", token);

      // Set auth state
      setAuthState({
        user: user.username,
        token: token,
        role: user.role,
      });

      // Role-based navigation
      if (user.role === "Admin") {
        navigate("/home");
      } else if (user.role === "User") {
        navigate("/user/home");
      } else {
        console.warn("Unknown role, redirecting to login");
        navigate("/login");
      }

      setServerMessage(message);
      setContent(user.role);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setServerMessage(
        error.response?.data?.message ||
          "Server went down. Reload the page to resolve the issue!"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setServerMessage(""), 3000);
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
        <div className="app-logo flex items-center mb-6 w-18 h-18">
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
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
          DETS | Create Account
        </h2>

        <AnimatePresence mode="wait">
          {step === 1 && (
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
                  <FaUser className="mr-2" /> Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 active:bg-none"
                  placeholder="System User"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center text-gray-300 font-semibold mb-1">
                  <FaMailBulk className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="user@example.com"
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
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

              <div className="mb-4 relative">
                <label className="flex items-center text-gray-300 font-semibold mb-1">
                  <FaLock className="mr-2" /> Confirm Password
                </label>
                <input
                  type={viewConfPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Confirm Password"
                  required
                />
                <p
                  onClick={() => setViewConfPassword(!viewConfPassword)}
                  className="absolute top-9 right-3 text-sm text-blue-600 cursor-pointer"
                >
                  {viewConfPassword ? "Hide" : "Show"}
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <label className="flex items-center text-gray-300 font-semibold mb-1">
                  <FaUserShield className="mr-2" /> User Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  required
                >
                  <option className="bg-gray-600" value="">
                    Select Role
                  </option>
                  <option className="bg-gray-600" value="admin">
                    Admin
                  </option>
                  <option className="bg-gray-600" value="user">
                    User
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <label className="flex items-center text-gray-300 font-semibold mb-1">
                  <FaPhone className="mr-2" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border text-gray-300 border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="+250 782 345 678"
                  required
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {message && <p className="text-red-500 text-sm mb-2">{message}</p>}
        {serverMessage && (
          <p className="text-red-500 text-sm mb-2">{serverMessage}</p>
        )}
        {content && <p className="text-white mb-2 text-2xl">{content}</p>}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition ml-auto"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-auto"
            >
              {loading ? "Enrolling..." : "Enroll"}
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
