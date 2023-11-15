import { createContext, useContext } from 'react';
import useState from 'react-usestateref';

import {
  initAccountWatchlist,
  initAccountData,
  initCashFlowData,
  initInvoiceData,
} from './assets/data';

const appContext = createContext();

export const AppContextProvier = ({ children }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const shortMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [month, setMonth, monthRef] = useState('January');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinSidebarOpen, setIsMinSidebarOpen] = useState(false);
  const [accountWatchlist, setAccountWatchlist] =
    useState(initAccountWatchlist);
  const [accountData, setAccountData] = useState(initAccountData);
  const [cashFlowData, setCashFlowData] = useState(initCashFlowData);
  const [invoiceData, setInvoiceData] = useState(initInvoiceData);

  const randomNumberGen = (min, max, decimals) =>
    (Math.random() * (max - min) + min).toFixed(decimals);

  const genAccountDataRandom = () => {
    setAccountData((prev) => {
      let start = randomNumberGen(0, 17, 0);
      return [...prev.map((item) => [start++, randomNumberGen(4, 18, 0)])];
    });
  };

  const changeChartsData = () => {
    setAccountWatchlist((prev) => {
      return [
        ...prev.map((item) => {
          return {
            ...item,
            month: randomNumberGen(0.0, 2000.99, 2),
            ytd: randomNumberGen(10000.55, 20000.99, 2),
          };
        }),
      ];
    });

    setInvoiceData((prev) => {
      return [
        ...prev.map((item, index) => {
          if (index === 0 || index === prev.length - 1) {
            return { ...item, value: randomNumberGen(2, 17, 0) };
          } else if (index === prev.length - 2) {
            return {
              week:
                shortMonth[months.indexOf(monthRef.current)] +
                item.week.slice(3, 7) +
                days[months.indexOf(monthRef.current)],
              value: randomNumberGen(2, 17, 0),
            };
          } else {
            return {
              week:
                shortMonth[months.indexOf(monthRef.current)] +
                item.week.slice(3),
              value: randomNumberGen(2, 17, 0),
            };
          }
        }),
      ];
    });

    setAccountData((prev) => {
      let start = randomNumberGen(0, 17, 0);
      return [...prev.map((item) => [start++, randomNumberGen(4, 18, 0)])];
    });

    setCashFlowData((prev) => {
      const index = months.indexOf(monthRef.current);
      let dec = 5 - index;
      let inc = index <= 5 ? 0 : index - 5;
      const newArr = [];
      prev.map((item) => {
        if (dec > 0) {
          while (dec > 0) {
            newArr.push({
              month: months[months.length - dec--],
              in: randomNumberGen(7, 17, 0),
              out: randomNumberGen(1, 12, 0),
            });
          }
        }
        while (inc <= index) {
          newArr.push({
            month: months[inc++],
            in: randomNumberGen(7, 17, 0),
            out: randomNumberGen(1, 12, 0),
          });
        }
      });
      return [...newArr];
    });
  };
  return (
    <appContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        accountWatchlist,
        accountData,
        cashFlowData,
        invoiceData,
        month,
        setMonth,
        changeChartsData,
        isMinSidebarOpen,
        setIsMinSidebarOpen,
        genAccountDataRandom,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useGloableContext = () => useContext(appContext);
