// import { CiEdit } from 'react-icons/ci';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { useAppSelector } from '../../../redux/app/hook';
// import { useGetCommunityAdminRolesQuery } from '../../../redux/features/settings/settingsApi';
// import { useMemo } from 'react';
// import type { CommunityAdminRole } from '../../../redux/features/settings/settingsTypes';

// type Props = { selectedRoleId: string };

// const RenderSelectedRoles: React.FC<Props> = ({ selectedRoleId }) => {
//   const community = useAppSelector((state) => state.auth.user);

//   // Fetch specific role details (only runs when selectedRoleId exists)
//   const { data, isLoading } = useGetCommunityAdminRolesQuery(
//     {
//       community_id: community?.community.id || '',
//       community_user_id: community?.id || '',
//       community_role_id: selectedRoleId,
//     },
//     {
//       skip: !selectedRoleId, // Don't fetch if no role is selected
//     }
//   );

//   const selectedRoleResponseData = useMemo(
//     () => data?.data.data[0] as CommunityAdminRole,
//     [data?.data?.data]
//   );
// //
//   return (
//     <div className="rounded-lg border border-border flex-1 w-full">
//       <div className="flex items-center justify-between  w-full border-b border-border p-5">
//         <h2 className="font-opensans text-lg text-pry font-medium capitalize">
//           {selectedRoleResponseData && selectedRoleResponseData.name}
//         </h2>
//         <div className="flex items-center gap-5">
//           <button
//             type="button"
//             role="edit"
//             // onClick={setIsEditOpen}
//             className="cursor-pointer rounded-full transition-all duration-300 ease-linear hover:bg-[#f5f6f7]"
//           >
//             <CiEdit className="text-pry" size={20} />
//           </button>
//           <button
//             type="button"
//             role="delete"
//             // onClick={setIsEditOpen}
//             className="cursor-pointer rounded-full transition-all duration-300 ease-linear hover:bg-red-50"
//           >
//             <RiDeleteBin6Line className="text-red-500" size={20} />
//           </button>
//         </div>
//       </div>
//       <div className="p-5 space-y-5">
//         <div>
//           <p className="text-pry-text">Role Permissions</p>
//           <span className="text-text-light text-sm font-opensans">
//             See the list of Permissions that are available for this role
//           </span>
//         </div>
//         {/* Permission Groups */}
//         {/* <div className="space-y-6">
//                   {selectedRole.map((group, groupIndex) => (
//                     <div key={groupIndex}>
//                       <h5 className="text-base font-semibold text-gray-900 mb-3">
//                         {group.title}
//                       </h5>
//                       <div className="space-y-3">
//                         {group.permissions.map((permission) => (
//                           <label
//                             key={permission.id}
//                             className="flex items-start gap-3 cursor-pointer group"
//                           >
//                             <div className="relative inline-block mt-0.5">
//                               <input
//                                 type="checkbox"
//                                 checked={permission.checked}
//                                 readOnly
//                                 className="appearance-none h-5 w-5 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-green-600 checked:border-transparent checked:focus:ring-offset-gray-100 transition-all duration-200 ease-in-out group-hover:border-gray-400"
//                               />
//                               <svg
//                                 className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none transition-all duration-200 ease-in-out ${
//                                   permission.checked
//                                     ? 'opacity-100 scale-100'
//                                     : 'opacity-0 scale-50'
//                                 }`}
//                                 viewBox="0 0 12 12"
//                                 fill="none"
//                               >
//                                 <path
//                                   d="M10 3L4 9L2 7"
//                                   stroke="white"
//                                   strokeWidth="2"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </div>
//                             <span className="text-pry-text group-hover:text-gray-700 transition-colors duration-200">
//                               {selectedRole.name}
//                             </span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div> */}
//       </div>
//     </div>
//   );
// };

// export default RenderSelectedRoles;

// import { CiEdit } from 'react-icons/ci';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { useAppSelector } from '../../../redux/app/hook';
// import { useGetCommunityAdminRolesQuery } from '../../../redux/features/settings/settingsApi';
// import Spinners from '../../spinnners/Spinners';

// type Props = { selectedRoleId: string };

// const RenderSelectedRoles: React.FC<Props> = ({ selectedRoleId }) => {
//   const community = useAppSelector((state) => state.auth.user);

//   const { data, isLoading, isError } = useGetCommunityAdminRolesQuery(
//     {
//       community_id: community?.community.id || '',
//       community_user_id: community?.id || '',
//       community_role_id: selectedRoleId,
//     },
//     {
//       skip: !selectedRoleId,
//     }
//   );

//   const selectedRole = data?.data?.data?.[0];

//   if (!selectedRoleId) {
//     return (
//       <div className="rounded-lg border border-border flex-1 flex items-center justify-center min-h-[400px]">
//         <p className="text-gray-500">Select a role to view details</p>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="rounded-lg border border-border flex-1 flex items-center justify-center min-h-[400px]">
//         <Spinners variant="default" size="lg" color="primary" />
//       </div>
//     );
//   }

//   if (isError || !selectedRole) {
//     return (
//       <div className="rounded-lg border border-border flex-1 flex items-center justify-center min-h-[400px]">
//         <p className="text-red-500">Failed to load role details</p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-lg border border-border flex-1">
//       <div className="flex items-center justify-between w-full border-b border-border p-5">
//         <h2 className="font-opensans text-lg text-pry font-medium capitalize">
//           {selectedRole.name}
//         </h2>
//         <div className="flex items-center gap-5">
//           <button
//             type="button"
//             className="cursor-pointer rounded-full transition-all duration-300 ease-linear hover:bg-[#f5f6f7] p-2"
//           >
//             <CiEdit className="text-pry" size={20} />
//           </button>
//           <button
//             type="button"
//             className="cursor-pointer rounded-full transition-all duration-300 ease-linear hover:bg-red-50 p-2"
//           >
//             <RiDeleteBin6Line className="text-red-500" size={20} />
//           </button>
//         </div>
//       </div>

//       <div className="p-5 space-y-5">
//         <div className="flex gap-2 justify-between w-full">
//           <p className="text-pry-text font-medium">Description</p>
//           <span className="text-text-light text-sm font-opensans capitalize">
//             {selectedRole.description}
//           </span>
//         </div>

//         <div className="flex gap-2 justify-between w-full">
//           <p className="text-pry-text font-medium">Status</p>
//           <span
//             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
//               selectedRole.status === 'active'
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-gray-100 text-gray-800'
//             }`}
//           >
//             {selectedRole.status}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RenderSelectedRoles;

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
        <Spinners variant="default" size="lg" color="primary" />
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
