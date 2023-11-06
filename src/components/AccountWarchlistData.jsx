import { useGloableContext } from '../GloableContext';
import DashboardContainer from './DashboardContainer';
const AccountWarchlistData = () => {
  const { accountWatchlist } = useGloableContext();
  return (
    <DashboardContainer title={'Account watchlist'}>
      <table className='capitalize text-left w-full table-fixed '>
        <thead>
          <tr className='text-gray-400 text-sm'>
            <th colSpan={2} className='py-2'>
              account
            </th>
            <th className='ps-8'>this month</th>
            <th className='ps-12 '> YTD</th>
          </tr>
        </thead>
        <tbody>
          {accountWatchlist.map((item, index) => {
            return (
              <tr key={index}>
                <td colSpan={2} className='py-1'>
                  {item.account}
                </td>
                <td className='ps-8'>{item.month}</td>
                <td className='ps-12'>{item.ytd}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DashboardContainer>
  );
};
export default AccountWarchlistData;
