import { MdOutlineHome } from 'react-icons/md';
import DailyVisitors from '../../components/ui/dashbaord/DailyVisitors';
import EstateVisitors from '../../components/ui/dashbaord/EstateVisitors';
import Overview from '../../components/ui/dashbaord/Overview';
import { PendingResident } from '../../components/ui/dashbaord/PendingResident';
import Header from '../../components/ui/header/Header';

const Dashboard = () => {
  return (
    <section className="h-screen">
      <Header>
        <div className="space-x-2 flex items-center">
          <div className="bg-linear-to-b from-[#D0D5DD] to-[#fff] p-1 rounded-lg">
            <MdOutlineHome className="h-4 w-4" />
          </div>
          <h1 className="font-opensans text-xl text-[#101828] font-semibold capitalize">
            Dashboard
          </h1>
        </div>
      </Header>
      <div className="p-5">
        <Overview />
        <div className="flex justify-between items-center gap-5 my-5">
          <DailyVisitors />
          <EstateVisitors />
        </div>
        <div>
          <PendingResident />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
