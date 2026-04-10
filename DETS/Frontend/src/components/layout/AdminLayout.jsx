import React, { useState } from 'react';
import Sidebar from '../admin/Sidebar';
import Header from '../admin/Header';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (handles its own responsive behavior) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={handleSidebarToggle} />

        <main className="flex-1 bg-gray-100 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

        <footer className="p-4 text-center text-gray-500 text-sm bg-white border-t border-gray-200">
          Designed by <span className="text-blue-400 font-semibold hover:text-blue-600 cursor-pointer">LinkFy Connect</span>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;