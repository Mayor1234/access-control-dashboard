import DailyVisitors from '../../components/ui/dashbaord/DailyVisitors';
import EstateVisitors from '../../components/ui/dashbaord/EstateVisitors';
import Overview from '../../components/ui/dashbaord/Overview';
import { PendingResident } from '../../components/ui/dashbaord/PendingResident';

const Dashboard = () => {
  return (
    <section className="h-screen">
      <div className="px-5 pb-5">
        <Overview />
        <div className="flex flex-col md:flex-row justify-between gap-5 space-y-5 my-5">
          <DailyVisitors />
          <EstateVisitors />
        </div>
        <PendingResident />
      </div>
    </section>
  );
};

export default Dashboard;
