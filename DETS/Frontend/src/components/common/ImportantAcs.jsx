import React, { useState, useEffect } from "react";
import { Activity, Bell, X } from "lucide-react";

export default function ImportantAcs() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);
  
  return (
    <>
      <div className="relative w-full md:flex-1 h-96 md:h-full rounded-md border border-gray-300">
        <div className="head w-full h-13 bg-blue-500 rounded-t-md justify-center items-center">
          <span className="flex justify-center items-center translate-y-3 text-white font-semibold">
            <Activity className="text-white text-center flex justify-center items-center" />
            Important Activities
          </span>
        </div>

        <div className="body w-full max-h-[90%] rounded-b-md flex flex-col items-center space-y-2 overflow-y-auto p-2">
          <div
            className="note w-[99%] h-20 bg-white hover:scale-104 transition-all hover:bg-blue-100 cursor-pointer border border-blue-300 shadow-md rounded-md shrink-0 flex items-center justify-between"
            onClick={openModal}
          >
            <div className="icon">
              <Bell className="text-blue-500 translate-x-2" />
            </div>
            <div className="note-body translate-x-6">
              <span className="text-blue-500 font-semibold">
                Stock Notification
              </span>
              <p className="text-sm text-gray-700">
                Lorem ipsum, dolor sit amet consectetu
              </p>
            </div>
            <div className="note-delete">
              <X className="text-red-400 font-bold mr-2 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}