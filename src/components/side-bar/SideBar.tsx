import { useState } from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/menu-logo.png';
import { MdPowerSettingsNew, MdSettings } from 'react-icons/md';
import { sideBarBottomMenu, sideBarTopMenu } from '../../constants';

interface SideBarProps {
  isSidebarOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen }) => {
  // const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openSettings, setOpenSettings] = useState(false);

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
        <div className="w-full h-full">
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
        <div className="w-full h-full px-3 space-y-2">
          {sideBarBottomMenu.map((item, i) => {
            if (!item.children) {
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  className={() =>
                    `flex items-center gap-4 px-3 py-1 font-libre tracking-wide text-sm  hover:text-active/70 transition-all duration-300 ease-linear cursor-pointer" ${
                      isActivePath(item.path)
                        ? 'border-l-3 border-[#fff] rounded-l-xs text-[#fff] transition-all duration-300 ease-linear hover:text-active/70'
                        : ''
                    }`
                  }
                >
                  {item.icon}
                  {isSidebarOpen ? item.label : item.label.charAt(0)}
                </NavLink>
              );
            }
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenSettings((prev) => !prev)}
                  className={`flex items-center w-full font-jakarta gap-4 px-3 text-base py-1 hover:bg-pry-hover cursor-pointer`}
                >
                  <MdSettings className="h-5 w-5" />
                  <span>Settings</span>
                  <span className="transition-all duration-200 ease-linear ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`size-4 transform ${
                        openSettings ? 'rotate-90' : 'rotate-0'
                      } transition-transform duration-200 ease-linear`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </button>
                {openSettings && (
                  <div
                    className="relative my-2 ml-4 space-y-2 overflow-y-auto scrollbar transition-all duration-300 ease-linear text-white before:content-[''] before:absolute before:w-[0.8px] before:h-full before:left-1 before:top-0
                 before:bg-[#B2BBC7] after:content-[''] after:absolute after:bottom-0 after:h-1.5 after:w-1.5 after:left-0.5 after:bg-[#B2BBC7] after:rounded-full"
                  >
                    {item.children.map((link, i) => {
                      return (
                        <NavLink
                          key={i}
                          to={link.path!}
                          className={() =>
                            `flex pl-8 py-1 font-libre tracking-wide text-sm hover:text-active/70 transition-all duration-300 ease-linear cursor-pointer ${
                              isActivePath(link.path)
                                ? 'text-mantra-orange transition-all duration-300 ease-linear hover:text-mantra-orange'
                                : ''
                            }`
                          }
                        >
                          {isSidebarOpen ? link.label : link.label.charAt(0)}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Link to={'/'} className="w-full px-3">
          <button
            type="button"
            className="w-full text-[#fff] flex items-center gap-5 px-3 py-1.5 font-libre tracking-wide text-base rounded-2xl hover:bg-active hover:text-dark transition-all duration-300 ease-linear cursor-pointer"
          >
            <MdPowerSettingsNew size={20} />
            Log out
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
