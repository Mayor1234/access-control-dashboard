import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import type {  ResidentAssignment } from '../../../redux/features/dashboard/residentTypes';
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
  rowData: ResidentAssignment;
  community_admin_id: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const [approveResident, { isLoading: isApproveLoading }] =
    useApproveResidentMutation();
  const [rejectResident, { isLoading: isRejectLoading }] =
    useRejectResidentMutation();

  const user = useAppSelector((state) => state.auth.user);

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
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  View Detail
                </button>
                <button
                  type="button"
                  onClick={handleApproveResident}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#16B364] transition-all duration-300 ease-linear hover:bg-green-50 cursor-pointer"
                  disabled={isApproveLoading}
                >
                  {isApproveLoading ? (
                    <Spinners variant="default" size="sm" color="white" label="Processing..." />
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
                    <Spinners variant="default" size="sm" color="white" label="Processing..." />
                  ) : (
                    'Decline'
                  )}
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
