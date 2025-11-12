import { HiUser } from 'react-icons/hi2';
import Header from '../../../components/ui/header/Header';
import SearchComponent from '../../../components/ui/search/SearchComponent';
import { Button } from '../../../components/ui/button/Button';
import { GoPlus } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import Modal from '../../../components/modal/Modal';
import AddAdminRole from '../../../components/ui/settings/AddAdminRole';
import { useAppSelector } from '../../../redux/app/hook';
import { useGetCommunityAdminRolesQuery } from '../../../redux/features/settings/settingsApi';
import RenderSelectedRoles from '../../../components/ui/settings/RenderSelectedRoles';
import Spinners from '../../../components/spinnners/Spinners';
import RenderUserByRoleId from '../../../components/ui/settings/RenderUserByRoleId';

const UserRoles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState('');

  const community = useAppSelector((state) => state.auth.user);

  const { data: communityRolesResponseData, isLoading: isLoadingRoles } =
    useGetCommunityAdminRolesQuery({
      community_id: community?.community.id || '',
      community_user_id: community?.id || '',
    });

  // Auto-select first role when data loads
  useEffect(() => {
    if (communityRolesResponseData?.data?.data?.length && !selectedRoleId) {
      setSelectedRoleId(communityRolesResponseData.data.data[0].id);
    }
  }, [selectedRoleId, communityRolesResponseData]);

  const handleRoleClick = (roleId: string) => {
    setSelectedRoleId(roleId);
  };

  // Find selected role from the already fetched data
  const selectedRole = communityRolesResponseData?.data?.data.find(
    (role) => role.id === selectedRoleId
  );

  const filters = [
    {
      id: 'category',
      label: 'Category',
      options: ['Electronics', 'Clothing', 'Books', 'Home'],
    },
    {
      id: 'status',
      label: 'Status',
      options: ['Active', 'Pending', 'Completed', 'Cancelled'],
    },
    {
      id: 'date',
      label: 'Date Range',
      // No options means it will render a text input
    },
  ];

  const handleSearch = (query: string, filters: Record<string, string>) => {
    console.log('Search query:', query);
    console.log('Filters:', filters);
    // Implement your search logic here
  };

  return (
    <section>
      <Header>
        <div className="space-x-2 flex items-center">
          <div className="bg-linear-to-b from-[#D0D5DD] to-[#fff] p-1 rounded-lg">
            <HiUser className="h-4 w-4 text-pry" />
          </div>
          <h2 className="font-opensans text-xl text-pry font-semibold capitalize">
            User Roles
          </h2>
        </div>
      </Header>
      <div className="w-full space-y-5 px-5">
        <div className="my-5 w-full">
          <SearchComponent
            placeholder="Search..."
            onSearch={handleSearch}
            filters={filters}
            debounceTime={400}
          >
            <Button
              variant="primary"
              size="md"
              className="rounded-lg py-2"
              leftIcon={<GoPlus size={16} />}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Create New Role
            </Button>
          </SearchComponent>
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen}>
            <div className="bg-white text-dark max-w-lg w-full h-full">
              <AddAdminRole
                setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
              />
            </div>
          </Modal>
        )}
        <div className="border border-border rounded-lg p-5">
          {/* Table or list of user roles would go here */}
          <div className="flex items-center gap-3 mb-5">
            <p className="text-pry-text">User Roles</p>
            <span className="text-xs px-3 py-1 rounded-full text-[#2B2AC7] bg-[#2B2AC714]">
              {communityRolesResponseData?.data.data.length} User roles
            </span>
          </div>
          <div className="flex justify-between gap-3 w-full">
            <div className="rounded-lg border border-gray-200 p-5 w-64">
              {isLoadingRoles ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <Spinners variant="default" size="xl" color="primary" />
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-3 top-6 bottom-6 w-px bg-border" />
                  <div className="space-y-1 relative w-full">
                    {communityRolesResponseData?.data.data.map((role) => (
                      <div key={role.id} className="relative w-full">
                        {/* Horizontal line connecting to button */}
                        <div className="absolute left-3 top-1/2 w-6 h-px bg-border" />
                        <button
                          onClick={() => handleRoleClick(role.id)}
                          className={`w-full text-left px-3 py-3 pl-12 rounded-lg flex items-center justify-between transition-all duration-300 ease-linear cursor-pointer capitalize ${
                            selectedRoleId === role.id
                              ? 'bg-blue-50 text-[#2B2AC7]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-base">{role.name}</span>
                          {selectedRoleId === role.id && (
                            <MdCheck size={20} className="text-[#2B2AC7]" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/*  2nd Section */}
            {/* <RenderSelectedRoles selectedRoleId={selectedRoleId} /> */}
            <RenderSelectedRoles
              selectedRole={selectedRole}
              isLoading={isLoadingRoles}
            />

            {/* 3rd section */}
            <RenderUserByRoleId />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRoles;

// const roles: Role[] = [
//   {
//     id: 'super-admin',
//     name: 'Super Admin',
//     permissionGroups: [
//       {
//         title: 'Transactions permissions',
//         permissions: [
//           {
//             id: 'view-transactions',
//             label: 'Can view transactions',
//             checked: true,
//           },
//           {
//             id: 'log-refunds',
//             label: 'Can log refunds and chargebacks',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Residents permissions',
//         permissions: [
//           { id: 'view-residents', label: 'Can view residents', checked: true },
//           {
//             id: 'create-residents',
//             label: 'Can create residents',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Settings permissions',
//         permissions: [
//           {
//             id: 'manage-settings',
//             label: 'Can view and manage settings',
//             checked: true,
//           },
//           {
//             id: 'manage-switching',
//             label: 'Can manage switching service',
//             checked: true,
//           },
//           { id: 'add-users', label: 'Can add new users', checked: true },
//           {
//             id: 'new-roles',
//             label: 'Can new user roles and permissions',
//             checked: true,
//           },
//           {
//             id: 'manage-preferences',
//             label: 'Can manage account preferences',
//             checked: true,
//           },
//           {
//             id: 'edit-users',
//             label: 'Can delete and edit existing users',
//             checked: true,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'admin',
//     name: 'Admin',
//     permissionGroups: [
//       {
//         title: 'Transactions permissions',
//         permissions: [
//           {
//             id: 'view-transactions',
//             label: 'Can view transactions',
//             checked: false,
//           },
//           {
//             id: 'log-refunds',
//             label: 'Can log refunds and chargebacks',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Residents permissions',
//         permissions: [
//           { id: 'view-residents', label: 'Can view residents', checked: true },
//           {
//             id: 'create-residents',
//             label: 'Can create residents',
//             checked: false,
//           },
//         ],
//       },
//       {
//         title: 'Settings permissions',
//         permissions: [
//           {
//             id: 'manage-settings',
//             label: 'Can view and manage settings',
//             checked: true,
//           },
//           {
//             id: 'manage-switching',
//             label: 'Can manage switching service',
//             checked: false,
//           },
//           { id: 'add-users', label: 'Can add new users', checked: true },
//           {
//             id: 'new-roles',
//             label: 'Can new user roles and permissions',
//             checked: true,
//           },
//           {
//             id: 'manage-preferences',
//             label: 'Can manage account preferences',
//             checked: false,
//           },
//           {
//             id: 'edit-users',
//             label: 'Can delete and edit existing users',
//             checked: true,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'security-gate-1',
//     name: 'Security Gate 1',
//     permissionGroups: [
//       {
//         title: 'Transactions permissions',
//         permissions: [
//           {
//             id: 'view-transactions',
//             label: 'Can view transactions',
//             checked: true,
//           },
//           {
//             id: 'log-refunds',
//             label: 'Can log refunds and chargebacks',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Residents permissions',
//         permissions: [
//           { id: 'view-residents', label: 'Can view residents', checked: true },
//           {
//             id: 'create-residents',
//             label: 'Can create residents',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Settings permissions',
//         permissions: [
//           {
//             id: 'manage-settings',
//             label: 'Can view and manage settings',
//             checked: true,
//           },
//           {
//             id: 'manage-switching',
//             label: 'Can manage switching service',
//             checked: false,
//           },
//           { id: 'add-users', label: 'Can add new users', checked: false },
//           {
//             id: 'new-roles',
//             label: 'Can new user roles and permissions',
//             checked: true,
//           },
//           {
//             id: 'manage-preferences',
//             label: 'Can manage account preferences',
//             checked: false,
//           },
//           {
//             id: 'edit-users',
//             label: 'Can delete and edit existing users',
//             checked: false,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'security-gate-2',
//     name: 'Security Gate 2',
//     permissionGroups: [
//       {
//         title: 'Transactions permissions',
//         permissions: [
//           {
//             id: 'view-transactions',
//             label: 'Can view transactions',
//             checked: false,
//           },
//           {
//             id: 'log-refunds',
//             label: 'Can log refunds and chargebacks',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Residents permissions',
//         permissions: [
//           { id: 'view-residents', label: 'Can view residents', checked: false },
//           {
//             id: 'create-residents',
//             label: 'Can create residents',
//             checked: true,
//           },
//         ],
//       },
//       {
//         title: 'Settings permissions',
//         permissions: [
//           {
//             id: 'manage-settings',
//             label: 'Can view and manage settings',
//             checked: false,
//           },
//           {
//             id: 'manage-switching',
//             label: 'Can manage switching service',
//             checked: true,
//           },
//           { id: 'add-users', label: 'Can add new users', checked: true },
//           {
//             id: 'new-roles',
//             label: 'Can new user roles and permissions',
//             checked: false,
//           },
//           {
//             id: 'manage-preferences',
//             label: 'Can manage account preferences',
//             checked: true,
//           },
//           {
//             id: 'edit-users',
//             label: 'Can delete and edit existing users',
//             checked: false,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'viewer',
//     name: 'Viewer',
//     permissionGroups: [
//       {
//         title: 'Transactions permissions',
//         permissions: [
//           {
//             id: 'view-transactions',
//             label: 'Can view transactions',
//             checked: true,
//           },
//           {
//             id: 'log-refunds',
//             label: 'Can log refunds and chargebacks',
//             checked: false,
//           },
//         ],
//       },
//       {
//         title: 'Residents permissions',
//         permissions: [
//           { id: 'view-residents', label: 'Can view residents', checked: true },
//           {
//             id: 'create-residents',
//             label: 'Can create residents',
//             checked: false,
//           },
//         ],
//       },
//       {
//         title: 'Settings permissions',
//         permissions: [
//           {
//             id: 'manage-settings',
//             label: 'Can view and manage settings',
//             checked: false,
//           },
//           {
//             id: 'manage-switching',
//             label: 'Can manage switching service',
//             checked: false,
//           },
//           { id: 'add-users', label: 'Can add new users', checked: false },
//           {
//             id: 'new-roles',
//             label: 'Can new user roles and permissions',
//             checked: false,
//           },
//           {
//             id: 'manage-preferences',
//             label: 'Can manage account preferences',
//             checked: false,
//           },
//           {
//             id: 'edit-users',
//             label: 'Can delete and edit existing users',
//             checked: false,
//           },
//         ],
//       },
//     ],
//   },
// ];
