import { useState } from 'react';
import logo from '../assets/assiduus-logo-dark.webp';
import profile from '../assets/profile.jpg';
import { BiSearchAlt2, BiSolidBell, BiCaretDown } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { useGloableContext } from '../GloableContext';
import { FaRandom } from 'react-icons/fa';

const Header = () => {
  const { setIsMinSidebarOpen, changeChartsData } = useGloableContext();
  const [actvieNotification, setActiveNotification] = useState(true);
  return (
    <header className='max-w-full bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.1)] h-[4rem] py-3  '>
      <div className=' px-4 lg:px-8 mx-auto flex items-center justify-between'>
        <div className=' flex justify-between w-full '>
          <img src={logo} alt='assiduus logo' className='w-40 lg:hidden ' />
          <div className='flex gap-2 justify-center items-center lg:hidden'>
            <button
              className=' border border-green-400 bg-none'
              onClick={() => changeChartsData()}
            >
              <FaRandom className='text-green-500  text-2xl hover:text-green-700 p-1  ' />
            </button>
            <button className='' onClick={() => setIsMinSidebarOpen(true)}>
              <FaBars className=' border-collapse bg-none text-green-500  text-3xl' />
            </button>
          </div>
        </div>
        <div className=' justify-between items-center gap-6  hidden lg:flex '>
          <button
            className='tracking-tight border border-green-400 bg-none'
            onClick={() => changeChartsData()}
          >
            <FaRandom className='text-green-500  text-2xl hover:text-green-700 p-1  ' />
          </button>
          <div className='bg-gray-50 rounded-lg px-4 py2 flex items-center '>
            <BiSearchAlt2 className='text-xl text-gray-400' />

            <input
              type='search'
              name='search'
              id='search'
              className='bg-gray-50 px-2 py-1 focus:outline-none '
              placeholder='search'
            />
          </div>
          <button
            type='button'
            className='relative'
            onClick={() => setActiveNotification(!actvieNotification)}
          >
            <BiSolidBell className='text-xl' />
            {actvieNotification && (
              <span className='w-2 h-2 rounded-[50%] bg-green-500  border border-white absolute top-0 right-0 '></span>
            )}
          </button>
          <div className='flex items-center gap-4'>
            <img
              src={profile}
              alt='mahammed shoheb'
              className='w-6 h-6 rounded-[50%] object-cover'
            />
            <BiCaretDown className='block text-5xl' />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
