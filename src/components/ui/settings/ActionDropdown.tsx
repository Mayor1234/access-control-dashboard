import { useState } from 'react';
import { Button } from '../button/Button';
import { MdOutlineClose } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import Modal from '../../modal/Modal';
import EditUserModal from './EditUserModal';

const ActionsDropdown = ({
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  //   const navigate = useNavigate();

  //   const location = useLocation();
  //   const { pathname } = location;

  const handleEditUser = () => {
    console.log(`Viewing details for ${residentName}`);
    console.log(residentId);
    // navigate(`${pathname}/${residentId}`);
    setIsModalOpen(true);
    // if (isModalOpen) {
    //   onClose();
    // }
  };

  const handleDeleteUser = () => {
    console.log(`Deleting ${residentName}`);
    setIsDeleteOpen(true);
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
          <div className="absolute -right-5 -top-10 mt-2 w-36 h-fit bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className=" relative py-2 flex flex-col">
              <button
                onClick={handleEditUser}
                className="w-full text-left px-4 py-2 text-sm text-pry-text hover:bg-gray-100 cursor-pointer"
              >
                Edit User
              </button>
              <button
                onClick={handleDeleteUser}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Delete User
              </button>
              {isDeleteOpen && (
                <div className="absolute -right-0 -top-10 mt-2 w-96 h-fit bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="p-5 w-full">
                    <div className="flex items-center justify-between mb-5 w-full">
                      <div className="bg-red-100 rounded-full p-2">
                        <RiDeleteBinLine className="text-red-600" size={20} />
                      </div>
                      <button
                        type="button"
                        // onClick={setIsMarkOpen.bind(null, false)}
                        onClick={() => {
                          setIsDeleteOpen(false);
                          onClose();
                        }}
                        className="cursor-pointer"
                      >
                        <MdOutlineClose className="text-pry" size={20} />
                      </button>
                    </div>
                    <div className="mb-3">
                      <h3 className="text-base font-medium text-pry-text mb-2 ">
                        Delete {residentName}
                      </h3>
                      <p className="text-sm text-[#667085] whitespace-normal ">
                        Are you sure you want to delete this user? They won't
                        have access to ABMS anymore.
                      </p>
                    </div>
                    <div className="flex justify-center gap-3 w-full">
                      <Button
                        variant="outline"
                        size="md"
                        className="w-full rounded-lg py-2 mt-4 mr-3"
                        onClick={() => {
                          setIsDeleteOpen(false);
                          onClose();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        className=" w-full rounded-lg py-2 mt-4"
                      >
                        Yes, Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isModalOpen && (
              <Modal isOpen={isModalOpen}>
                <div className="bg-white text-dark max-w-lg w-full h-full">
                  <EditUserModal
                    setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
                    onClose={onClose}
                    residentId={residentId}
                  />
                </div>
              </Modal>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ActionsDropdown;
