import {
  MdAccountBalanceWallet,
  MdDashboard,
  MdPerson,
  MdContacts,
} from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';
import { PiFileTextFill } from 'react-icons/pi';

export const sidebarLinks = [
  {
    name: 'dashboard',
    path: '#',
    icon: <MdDashboard />,
  },
  {
    name: 'accounts',
    path: '#',
    icon: <MdAccountBalanceWallet />,
  },
  {
    name: 'payroll',
    path: '#',
    icon: <FaDollarSign />,
  },
  {
    name: 'reports',
    path: '#',
    icon: <PiFileTextFill />,
  },
  {
    name: 'advisor',
    path: '#',
    icon: <MdPerson />,
  },
  {
    name: 'contacts',
    path: '#',
    icon: <MdContacts />,
  },
];

export const initAccountWatchlist = [
  {
    account: 'sales',
    month: '1,194.58',
    ytd: '11,418.29',
  },
  {
    account: 'advertising',
    month: '6,879.02',
    ytd: '9,271.36',
  },
  {
    account: 'inventory',
    month: '4,692.26',
    ytd: '9,768.09',
  },
  {
    account: 'entertainment',
    month: '0.00',
    ytd: '0.00',
  },
  {
    account: 'product',
    month: '4,652.10',
    ytd: '2,529.90',
  },
];

export const initAccountData = [
  [9, 7],
  [10, 10],
  [11, 18],
  [12, 12],
  [13, 5],
  [14, 9],
  [15, 13],
  [16, 11],
  [17, 8],
  [18, 10],
];

export const initCashFlowData = [
  {
    month: 'August',
    in: 15,
    out: 10,
  },
  {
    month: 'September',
    in: 12,
    out: 8,
  },
  {
    month: 'October',
    in: 17,
    out: 15,
  },
  {
    month: 'November',
    in: 14,
    out: 11,
  },
  {
    month: 'December',
    in: 13,
    out: 9,
  },
  {
    month: 'January',
    in: 17,
    out: 9,
  },
];

export const initInvoiceData = [
  {
    week: 'older',
    value: 4,
  },
  {
    week: 'jan 01-08',
    value: 6,
  },
  {
    week: 'jan 09-06',
    value: 17,
  },
  {
    week: 'jan 17-24',
    value: 13,
  },
  {
    week: 'jan 25-31',
    value: 15,
  },
  {
    week: 'future',
    value: 9,
  },
];
