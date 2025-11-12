import { useLocation, useNavigate } from 'react-router-dom';
import type { EstateResident } from '../../../redux/features/dashboard/residentTypes';
import {
  useApproveResidentMutation,
  useRejectResidentMutation,
} from '../../../redux/features/dashboard/dashboardApi';
import { toast } from 'react-toastify';
import Spinners from '../../spinnners/Spinners';
import { useAppSelector } from '../../../redux/app/hook';

const MoreActionsDropdown = ({
  community_admin_id,
  rowData,
  isOpen,
  onToggle,
  onClose,
}: {
  rowData: EstateResident;
  community_admin_id: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const [approveResident, { isLoading: isApproveLoading }] =
    useApproveResidentMutation();
  const [rejectResident, { isLoading: isRejectLoading }] =
    useRejectResidentMutation();

  const user = useAppSelector((state) => state.auth.user);

  const handleViewDetail = () => {
    console.log(`Viewing details for ${rowData}`);
    navigate(`${pathname}/${rowData.id}`);
    onClose();
  };

  const handleApproveResident = async () => {
    if (!user?.community.id) return;

    try {
      const response = await approveResident({
        community_id: user?.community.id as string,
        resident_id: rowData.id,
        community_admin_id,
      }).unwrap();

      console.log('Approval response', response);
      if (response.status === 'success') {
        toast.success(response.message);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineResident = async () => {
    try {
      const response = await rejectResident({
        community_id: user?.community.id as string,
        resident_id: rowData.id,
        community_admin_id,
      }).unwrap();

      console.log('Approval response', response);
      if (response.status === 'success') {
        toast.success(response.message);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
            <div className="flex flex-col">
              <button
                onClick={handleViewDetail}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                View Detail
              </button>
              <button
                type="button"
                onClick={handleApproveResident}
                className="w-full text-left px-4 py-2.5 text-sm text-[#16B364]  transition-all duration-300 ease-linear hover:bg-green-50 cursor-pointer"
                disabled={isApproveLoading}
              >
                {isApproveLoading ? (
                  <Spinners
                    variant="default"
                    size="sm"
                    color="white"
                    label="Processing..."
                  />
                ) : (
                  'Approve'
                )}
              </button>
              <button
                type="button"
                onClick={handleDeclineResident}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                {isRejectLoading ? (
                  <Spinners
                    variant="default"
                    size="sm"
                    color="white"
                    label="Processing..."
                  />
                ) : (
                  'Decline'
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MoreActionsDropdown;
