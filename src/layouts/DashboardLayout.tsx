import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SideBar from '../components/side-bar/SideBar';

export default function DashboardLayout() {
  const [isSidebarOpen /*setIsSidebarOpen*/] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-800">
      {/* Sidebar */}
      <SideBar isSidebarOpen={isSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Page content with animation */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="overflow-y-auto flex-1"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
