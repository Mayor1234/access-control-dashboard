import { FaRegCalendarMinus } from 'react-icons/fa6';
import PieChart from '../../charts/PieChart';
import { Button } from '../button/Button';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const EstateVisitors = () => {
  return (
    <div className="border border-[#E6E9EE] rounded-lg w-[40%] h-full">
      <div className="w-full flex items-center justify-between px-5 py-3 mb-3 border-b  border-[#E6E9EE] pb-3">
        <h2 className="font-opensans font-medium">Estate Visitors</h2>
        <Button
          variant="outline"
          size="md"
          className="rounded-xl py-2"
          leftIcon={<FaRegCalendarMinus size={16} />}
          rightIcon={<MdOutlineKeyboardArrowDown size={20} />}
        >
          6 Month
        </Button>
      </div>
      <div className="h-72 w-full p-5">
        <PieChart />
      </div>
    </div>
  );
};

export default EstateVisitors;
