export const formatStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-[#FEF3F2] text-[#F28E2B] px-3 py-1 rounded-full capitalize';
    case 'active':
      return 'bg-[#ECFDF3] text-[#027A48] px-3 py-1 rounded-full';
    case 'inactive':
      return 'bg-[#FFFAEB] text-[#F28E2B] px-3 py-1 rounded-full';
    case 'approved':
      return 'bg-[#ECFDF3] text-[#027A48] px-3 py-1 rounded-full';
    case 'rejected':
      return 'bg-[#FEF0DB] text-[#EA4335] px-3 py-1 rounded-full';
    case 'upcoming':
      return 'bg-[#FEF3F2] text-[#F28E2B] px-3 py-1 rounded-full';
    case 'checkin':
      return 'bg-[#ECFDF3] text-[#027A48] px-3 py-1 rounded-full capitalize';
    case 'checkout':
      return 'bg-[#FEF3F2] text-[#B42318] px-3 py-1 rounded-full capitalize';
    case 'REMOTE':
      return 'bg-[#F3EEFE] text-pry px-3 py-1 rounded-full';
    case 'RESIGNED':
      return 'bg-[#F8D8AB] text-[#FAAB3C] px-3 py-1 rounded-full';
    case 'ON LEAVE':
      return 'bg-[#EEF4FE] text-[#1F74EC] px-3 py-1 rounded-full';
    case 'TERMINATED':
      return 'bg-[#FEF0DB] text-[#EA4335] px-3 py-1 rounded-full';
    case 'resolved':
      return 'bg-[#ECFDF3] text-[#027A48] px-3 py-1 rounded-full';
    case 'unresolved':
      return 'bg-[#FEF3F2] text-[#B42318] px-3 py-1 rounded-full';
    case 'medium':
      return 'bg-[#FEF3F2] text-[#F28E2B] px-3 py-1 rounded-full';
    case 'high':
      return 'bg-[#FEF3F2] text-[#B42318] px-3 py-1 rounded-full';
    default:
      return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full';
  }
};
