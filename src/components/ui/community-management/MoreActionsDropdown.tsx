import { useLocation, useNavigate } from 'react-router-dom';
import type { EstateResident } from '../../../redux/features/dashboard/residentTypes';

const MoreActionsDropdown = ({
  data,
  isOpen,
  onToggle,
  onClose,
}: {
  data: EstateResident;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const handleViewDetail = () => {
    navigate(`${pathname}/${data.id}`);
    onClose();
  };

  const handleApproveDetail = () => {
    onClose();
  };
  const handleDeleteResident = () => {
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        type="button"
      >
        <div className="flex flex-col gap-[3px]">
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              className="w-[3px] h-[3px] bg-[#969DA6] rounded-full"
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <>
          {/* Overlay to close when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={onClose} />
          {/* Dropdown */}
          <div className="absolute -right-5 -top-10 mt-2 w-44 h-fit bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="flex flex-col">
              <button
                onClick={handleViewDetail}
                className="w-full text-left px-4 py-2 text-sm text-pry-text hover:bg-gray-100 cursor-pointer"
              >
                View Detail
              </button>
              <button
                onClick={handleApproveDetail}
                className="w-full text-left px-4 py-2 text-sm text-pry-text hover:bg-gray-100 cursor-pointer"
              >
                Edit Resident Profile
              </button>
              <button
                onClick={handleDeleteResident}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Remove Resident
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MoreActionsDropdown;
