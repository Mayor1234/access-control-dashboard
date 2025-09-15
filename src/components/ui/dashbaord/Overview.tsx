import { Button } from '../button/Button';
import { FaRegCalendarMinus } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Overview = () => {
  return (
    <div className="border border-[#E6E9EE] rounded-lg w-full">
      <div className="flex items-center justify-between w-full px-5 py-3 border-b border-[#E6E9EE] mb-3">
        <h2 className="font-opensans font-medium text-lg">Overview</h2>
        <Button
          variant="primary"
          size="md"
          className="rounded-xl py-2.5"
          leftIcon={<FaRegCalendarMinus size={16} />}
          rightIcon={<MdOutlineKeyboardArrowDown size={20} />}
        >
          6 Months
        </Button>
      </div>
      <div className="flex items-center justify-between gap-6 w-full p-5">
        <div className="border border-[#E6E9EE] rounded-lg w-full">
          <div className="border-l-5 border-[#365B85] rounded-lg p-4 h-full">
            <h2 className="text-[#AFAFAF] font-inter mb-2">Total visitors</h2>
            <p className="text-[#365B85] font-inter font-medium text-2xl">
              128
            </p>
          </div>
        </div>
        <div className="border border-[#E6E9EE] rounded-lg w-full">
          <div className="border-l-5 border-[#365B85] rounded-lg p-3 h-full">
            <h2 className="text-[#AFAFAF] font-inter mb-3">Active visitors</h2>
            <p className="text-[#365B85] font-inter font-medium text-2xl">
              128
            </p>
          </div>
        </div>
        <div className="border border-[#E6E9EE] rounded-lg w-full">
          <div className="border-l-5 border-[#365B85] rounded-lg p-3 h-full">
            <h2 className="text-[#AFAFAF] font-inter font-medium mb-3">
              Active Residents
            </h2>
            <p className="text-[#365B85] font-inter font-medium text-2xl">
              128
            </p>
          </div>
        </div>
        <div className="border border-[#E6E9EE] rounded-lg w-full">
          <div className="border-l-5 border-[#365B85] rounded-lg p-3 h-full">
            <h2 className="text-[#AFAFAF] font-inter mb-3">
              Pending Residents approvals
            </h2>
            <p className="text-[#365B85] font-inter font-medium text-2xl">
              128
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
