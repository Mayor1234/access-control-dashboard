import UserStorage from '../../../shared/utils/userStorage';

const CommunityTap = () => {
  const communityName = UserStorage.getUser()?.communityId?.name;
  return (
    <div className="bg-[#F0F2F5] mb-3 py-2.5 px-5 rounded-lg">
      <p className="text-[#24356D] font-bold text-lg capitalize">
        {communityName || 'Mantra Protection Solutions Limited'}
      </p>
    </div>
  );
};

export default CommunityTap;
