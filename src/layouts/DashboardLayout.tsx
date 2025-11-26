import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import SideBar from '../components/side-bar/SideBar';
import Header from '../components/ui/header/Header';
import { sideBarBottomMenu, sideBarTopMenu } from '../constants';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const activeRoute = useMemo(() => {
    const allMenuItems = [...sideBarTopMenu, ...sideBarBottomMenu];

    // Check top-level items
    for (const item of allMenuItems) {
      // Exact match
      if (item.path === location.pathname) {
        return { icon: item.icon, label: item.label };
      }

      // Check if path starts with item path (for nested routes)
      if (location.pathname.startsWith(item.path!) && item.path !== '/') {
        // Check children first
        if ('children' in item && item.children) {
          for (const child of item.children) {
            if (child.path === location.pathname) {
              return { icon: item.icon, label: child.label };
            }
          }
        }
        return { icon: item.icon, label: item.label };
      }

      // Check children
      if ('children' in item && item.children) {
        for (const child of item.children) {
          if (child.path === location.pathname) {
            return { icon: item.icon, label: child.label };
          }
        }
      }
    }

    return null;
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-800">
      {/* Mobile Menu Toggle */}

      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header setIsSidebarOpen={setIsSidebarOpen}>
          {activeRoute ? (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-b from-[#D0D5DD] to-[#fff] p-1 sm:p-2 rounded-lg">
                <span className="h-4 w-4 sm:h-5 sm:w-5 text-pry flex items-center justify-center">
                  {activeRoute.icon}
                </span>
              </div>
              <h1 className="font-opensans text-base sm:text-xl text-pry font-semibold capitalize">
                {activeRoute.label}
              </h1>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="font-opensans text-base sm:text-xl text-pry font-semibold">
                Dashboard
              </h1>
            </div>
          )}
        </Header>
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
