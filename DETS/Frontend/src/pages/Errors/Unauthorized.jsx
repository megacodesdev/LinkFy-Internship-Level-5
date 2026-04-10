// src/pages/Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { FaLock, FaHome, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex justify-center mb-4">
            <FaLock className="text-5xl animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold">Access Restricted</h1>
          <p className="mt-2 opacity-90">
            You don't have permission to view this page
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <p className="text-gray-600 mb-6">
              Don't worry! Here are some helpful options:
            </p>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all"
              >
                <FaHome />
                Return Home
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-all"
              >
                ← Go Back
              </motion.button>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-500 mb-3">Need access?</p>
            <a
              href="linkfy@connect.com"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-gray-500 max-w-md"
      >
        Error code: 403 - Forbidden
      </motion.p>
    </div>
  );
}