export const formatStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-[#DDFCE0] text-[#0EB01D] px-3 py-1 rounded-full';
    case 'REMOTE':
      return 'bg-[#F3EEFE] text-pry px-3 py-1 rounded-full';
    case 'RESIGNED':
      return 'bg-[#F8D8AB] text-[#FAAB3C] px-3 py-1 rounded-full';
    case 'ON LEAVE':
      return 'bg-[#EEF4FE] text-[#1F74EC] px-3 py-1 rounded-full';
    case 'TERMINATED':
      return 'bg-[#FEF0DB] text-[#EA4335] px-3 py-1 rounded-full';
    default:
      return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full';
  }
};
