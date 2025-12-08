import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/menu-logo.png';
import { MdPowerSettingsNew, MdSettings } from 'react-icons/md';
import { sideBarBottomMenu, sideBarTopMenu } from '../../constants';
import { Button } from '../ui/button/Button';
import { setLogout } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/app/hook';

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openSettings, setOpenSettings] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isActivePath = (path: string) => location.pathname.startsWith(path);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile, setIsSidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isSidebarOpen]);

  const handleLinkClick = () => {
    if (isMobile && setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen?.(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          bg-pry text-light shadow-lg h-screen
          transition-all duration-300 ease-in-out
          flex flex-col
          ${
            isMobile
              ? isSidebarOpen
                ? 'translate-x-0 w-64'
                : '-translate-x-full w-64'
              : !isSidebarOpen
              ? 'w-64'
              : 'w-24'
          }
        `}
      >
        <div className="flex flex-col justify-between items-center h-full pb-10 w-full">
          <div className="w-full h-full">
            <div className="flex items-start justify-start px-3 py-5 mb-5 bg-pry-light rounded-bl-3xl">
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
                    onClick={handleLinkClick}
                    className={() =>
                      `flex items-center gap-4 px-3 py-1.5 font-libre tracking-wide text-sm  hover:text-active/70 transition-all duration-300 ease-linear cursor-pointer" ${
                        isActivePath(link.path)
                          ? 'border-l-3 border-[#fff] rounded-l-xs text-[#fff] transition-all duration-300 ease-linear hover:text-active/70'
                          : ''
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                    {/* {isSidebarOpen ? link.label : link.label.charAt(0)} */}
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
                    to={item.label}
                    className={() =>
                      `flex items-center gap-4 px-3 py-1.5 font-libre tracking-wide text-sm  hover:text-active/70 transition-all duration-300 ease-linear cursor-pointer" ${
                        isActivePath(item.path!)
                          ? 'border-l-3 border-[#fff] rounded-l-xs text-[#fff] transition-all duration-300 ease-linear hover:text-active/70'
                          : ''
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                );
              }
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenSettings((prev) => !prev)}
                    className={`flex items-center w-full font-jakarta gap-4 px-3 text-sm py-1 hover:bg-pry-hover cursor-pointer`}
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
                              `flex pl-8 py-1.5 font-libre tracking-wide text-sm hover:text-active/70 transition-all duration-300 ease-linear cursor-pointer ${
                                isActivePath(link.path)
                                  ? 'text-mantra-orange transition-all duration-300 ease-linear hover:text-mantra-orange'
                                  : ''
                              }`
                            }
                          >
                            {link.label}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full px-3">
            <Button
              size="sm"
              type="button"
              className="w-full text-[#fff] flex items-center gap-5 px-3 py-2 font-libre tracking-wide text-sm rounded-2xl hover:bg-active hover:text-dark transition-all duration-300 ease-linear cursor-pointer"
              onClick={() => dispatch(setLogout())}
            >
              <MdPowerSettingsNew size={20} />
              Log out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
