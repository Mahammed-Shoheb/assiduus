import AccountWarchlistData from './AccountWarchlistData';
import CheckingAccountChartfrom from './CheckingAccountChart';
import TotalCashChart from './TotalCashChart';

import InvoicesChart from './InvoicesChart';

const Dashboard = () => {
  return (
    <section className='grid lg:grid-cols-2 p-2 lg:p-8 gap-8 '>
      <CheckingAccountChartfrom />
      <InvoicesChart />
      <TotalCashChart />
      <AccountWarchlistData />
    </section>
  );
};
export default Dashboard;
