import { useGetAdminUsersQuery } from '../../../redux/features/settings/settingsApi';
import UserStorage from '../../../shared/utils/userStorage';
import Spinners from '../../spinnners/Spinners';

const RenderUserByRoleId = () => {
  const community_user_id = UserStorage.getUserId() ?? '';
  const community_id = UserStorage.getCommunityId() ?? '';
  const community_role_id = UserStorage.getRoleId() ?? '';

  const { data, isLoading } = useGetAdminUsersQuery({
    community_id: community_id,
    community_user_id,
    community_role_id,
  });

  const usersWithRole = data?.data.data || [];

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border flex-1 flex items-center justify-center min-h-[200px]">
        <Spinners variant="default" size="xl" color="primary" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 w-full md:w-96">
      <div className="flex items-center justify-between mb-5 w-full border-b border-border p-5">
        <h2 className="font-opensans text-lg text-pry font-medium">
          Users with this role
        </h2>
      </div>
      {/* Center - Role Details */}
      <div className="space-y-4 px-5 max-h-80 overflow-y-auto h-full pb-5">
        {usersWithRole.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium  bg-gray-100 text-gray-700`}
            >
              {user.first_name.charAt(0).toUpperCase()}{' '}
              {user.last_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderUserByRoleId;
