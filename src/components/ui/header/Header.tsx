import { MdNotifications } from 'react-icons/md';
import userProfile from '../../../assets/user-profile.png';
import type { ReactNode } from 'react';
import { MobileMenuToggle } from '../../../layouts/MobileMenuToggle';

type Props = {
  children: ReactNode;
  setIsSidebarOpen: (isOpen: boolean) => void;
};
const Header: React.FC<Props> = ({ children, setIsSidebarOpen }) => {
  return (
    <header className="h-20 flex items-center justify-between bg-white p-5 border-b border-border">
      <div>{children}</div>

      <div className="hidden sm:flex items-center gap-2">
        {/* Notification Icon with Badge */}
        <div className="relative">
          <MdNotifications className="w-5 h-5 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-[#FF5A5E] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>
        <div>
          <img
            src={userProfile}
            alt="header image"
            width={100}
            height={100}
            className="h-8 w-8 rounded-full object-cover ml-4 cursor-pointer"
          />
        </div>
      </div>
      <MobileMenuToggle onClick={() => setIsSidebarOpen(true)} />
    </header>
  );
};

export default Header;
