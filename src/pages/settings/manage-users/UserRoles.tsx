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
              className="rounded-lg py-2 self-end"
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
          <div className="flex flex-col justify-between md:flex-row gap-3 w-full">
            <div className="rounded-lg border border-gray-200 p-5 w-full md:w-64">
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
