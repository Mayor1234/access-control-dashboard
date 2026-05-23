import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const MoreActionsDropdown = ({
  residentId,
  isOpen,
  onToggle,
  onClose,
}: {
  residentId: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    onToggle();
  };

  const handleViewDetail = () => {
    navigate(`${pathname}/${residentId}`);
    onClose();
  };

  const handleDeleteVisitors = () => {
    onClose();
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        type="button"
      >
        <div className="flex flex-col gap-0.75">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="w-0.75 h-0.75 bg-[#969DA6] rounded-full" />
          ))}
        </div>
      </button>

      {isOpen &&
        createPortal(
          <>
            <div className="fixed inset-0 z-9998" onClick={onClose} />
            <div
              className="fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-9999"
              style={dropdownStyle}
            >
              <div className="flex flex-col">
                <button
                  onClick={handleViewDetail}
                  className="w-full text-left px-4 py-2.5 text-sm text-pry-text hover:bg-gray-50 rounded-t-lg cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={handleDeleteVisitors}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-lg cursor-pointer"
                >
                  Delete Visitors
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
};
export default MoreActionsDropdown;
