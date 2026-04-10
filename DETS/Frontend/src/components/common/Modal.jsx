import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
export default function Modal({ isOpen, isClosed, title }) {
    const modalRef = useRef(null);
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          isClosed();  // Use parent's close function
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isClosed]);
  
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        isClosed();
      }
    };
  
    if (!isOpen) return null;  // only show when isOpen=true
  
    return (
      <div
        className="fixed inset-0 z-50 w-full h-full bg-black/40 transition-opacity duration-300 flex justify-center items-center"
        onClick={handleClickOutside}
      >
        <div
          className="relative w-[70%] h-[70%] md:min-w-[400px] bg-white rounded-md flex justify-around transform transition-transform duration-300"
          ref={modalRef}
        >
          <div className="modal-head relative top-2 w-full h-10 border-b border-gray-300 flex justify-around items-center">
            <div className="head">
              <span className="font-semibold text-lg text-blue-500">
                {title}
              </span>
            </div>
            <div
              className="close--icon w-6 h-6 bg-red-100 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-red-500 transition-colors duration-300"
              onClick={isClosed}  // use prop function
            >
              <X className="w-4 h-4 text-red-500 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  