// import React, { useState } from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/logo/menu-logo.png';
import { MdPowerSettingsNew } from 'react-icons/md';
import { sideBarBottomMenu, sideBarTopMenu } from '../../constants';

interface SideBarProps {
  isSidebarOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen }) => {
  // const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const location = useLocation();

  const isActivePath = (path: string) => location.pathname.startsWith(path);

  // const handleToggle = (label: string) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [label]: !prev[label],
  //   }));
  // };

  return (
    <aside
      className={`transition-all duration-300 ease-in-out bg-pry text-light shadow-lg h-screen 
          ${isSidebarOpen ? 'w-64' : 'w-16'}
          hidden sm:block`}
    >
      <div className="flex flex-col justify-between items-center h-full pb-10 w-full">
        <div className="w-full">
          <div className="flex items-center justify-center p-5 mb-8">
            {/* <span className="text-xl font-bold whitespace-nowrap overflow-hidden transition-all">
          {isSidebarOpen ? 'MyApp' : '🧩'}
        </span> */}
            <img
              src={logo}
              alt="Mantra logo"
              width={100}
              height={100}
              className="w-44 h-10"
            />
          </div>
          <nav className="mt-4 space-y-2 px-3">
            {sideBarTopMenu.map((link, i) => {
              return (
                <NavLink
                  key={i}
                  to={link.path}
                  className={() =>
                    `flex items-center gap-4 px-3 py-1 font-libre tracking-wide text-sm  hover:text-active/70 transition-all duration-300 ease-linear cursor-pointer" ${
                      isActivePath(link.path)
                        ? 'border-l-3 border-[#fff] rounded-l-xs text-[#fff] transition-all duration-300 ease-linear hover:text-active/70'
                        : ''
                    }`
                  }
                >
                  {link.icon}
                  {isSidebarOpen ? link.label : link.label.charAt(0)}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="w-full px-3">
          <div className="flex flex-col gap-2">
            {sideBarBottomMenu.map((link, i) => {
              return (
                <NavLink
                  key={i}
                  to={link.path}
                  className={() =>
                    `flex items-center gap-4 px-3 py-1.5 font-libre tracking-wide text-sm rounded-3xl hover:bg-active/70 hover:text-dark transition-all duration-300 ease-linear cursor-pointer" ${
                      isActivePath(link.path)
                        ? 'bg-active text-dark transition-all duration-300 ease-linear hover:text-gray-700'
                        : ''
                    }`
                  }
                >
                  {link.icon}
                  {isSidebarOpen ? link.label : link.label.charAt(0)}
                </NavLink>
              );
            })}
          </div>
          <Link to={'/'} className="w-full px-5">
            <button
              type="button"
              className="w-full text-[#fff] flex items-center gap-5 px-3 py-1.5 font-libre tracking-wide text-base rounded-3xl hover:bg-active hover:text-dark transition-all duration-300 ease-linear cursor-pointer"
            >
              <MdPowerSettingsNew size={20} />
              Log out
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
