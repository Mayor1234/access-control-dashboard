import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Spinners from '../../spinnners/Spinners';

type Role = {
  id: string;
  name: string;
  description: string;
  status: string;
};

type Props = {
  selectedRole?: Role;
  isLoading: boolean;
};

const RenderSelectedRoles: React.FC<Props> = ({ selectedRole, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border flex-1 flex items-center justify-center min-h-[200px]">
        <Spinners variant="default" size="xl" color="primary" />
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="rounded-lg border border-border flex-1 flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Select a role to view details</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border flex-1">
      <div className="flex items-center justify-between w-full border-b  border-border p-5">
        <h2 className="font-opensans text-lg text-pry font-medium capitalize">
          {selectedRole.name}
        </h2>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="cursor-pointer rounded-full transition-all duration-300 ease-linear hover:bg-[#f5f6f7] p-2"
          >
            <CiEdit className="text-pry" size={16} />
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full transition-all duration-300 ease-linear hover:bg-red-50 p-2"
          >
            <RiDeleteBin6Line className="text-red-500" size={16} />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <p className="text-pry-text font-medium mb-2">Role Permissions</p>
          <span className="text-text-light text-sm font-opensans block mb-4">
            See the Permission details that are available for this role
          </span>
        </div>
        <div className="space-y-5">
          <div className="flex gap-2 justify-between w-full">
            <p className="text-pry-text font-medium">Description</p>
            <span className="text-text-light text-sm font-opensans capitalize">
              {selectedRole.description}
            </span>
          </div>

          <div className="flex gap-2 justify-between w-full">
            <p className="text-pry-text font-medium">Status</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                selectedRole.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {selectedRole.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderSelectedRoles;
