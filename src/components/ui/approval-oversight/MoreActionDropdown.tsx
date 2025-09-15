import { useLocation, useNavigate } from 'react-router-dom';

const MoreActionsDropdown = ({
  residentId,
  residentName,
  isOpen,
  onToggle,
  onClose,
}: {
  residentId: string;
  residentName: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const handleViewDetail = () => {
    console.log(`Viewing details for ${residentName}`);
    console.log(residentId);
    navigate(`${pathname}/${residentId}`);
    onClose();
  };

  const handleApproveDetail = () => {
    console.log(`Approved ${residentName}`);
    onClose();
  };
  const handleDeleteResident = () => {
    console.log(`Deleting ${residentName}`);
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
          <div className="absolute -right-5 -top-10 mt-2 w-36 h-fit bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-2 flex flex-col">
              <button
                onClick={handleViewDetail}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                View Detail
              </button>
              <button
                onClick={handleApproveDetail}
                className="w-full text-left px-4 py-2 text-sm text-[#16B364] hover:bg-gray-100 cursor-pointer"
              >
                Approvd
              </button>
              <button
                onClick={handleDeleteResident}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Decline
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MoreActionsDropdown;
