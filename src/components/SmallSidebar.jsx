import { useState } from 'react';
import { sidebarLinks } from '../assets/data';
import logo from '../assets/assiduus-logo-dark.webp';
import { FaTimes } from 'react-icons/fa';
import { useGloableContext } from '../GloableContext';

const Sidebar = () => {
  const { isMinSidebarOpen, setIsMinSidebarOpen } = useGloableContext();
  const [linkSelected, setLinkSelected] = useState(0);
  return (
    <aside
      className={`bg-white lg:hidden min-h-full w-[20rem] shadow-[1px_0_0_0_rgba(0,0,0,0.1)] fixed top-0 z-20 transition duration-200 ${
        isMinSidebarOpen ? 'translate-x-[0%]' : '-translate-x-[100%]'
      }`}
    >
      <div className='flex justify-between p-4'>
        <img src={logo} alt='assiduus logo' className='w-40 ' />
        <button
          className=' lg:hidden'
          onClick={() => setIsMinSidebarOpen(false)}
        >
          <FaTimes className=' border-collapse bg-none text-red-500  text-3xl' />
        </button>
      </div>
      <nav className='mt-10'>
        <ul className='grid'>
          {sidebarLinks.map((link, index) => {
            return (
              <li
                onClick={() => {
                  setIsMinSidebarOpen(false);
                  setLinkSelected(index);
                }}
                key={index}
                className={`${
                  linkSelected === index ? 'bg-green-400 text-white' : ''
                } text-lg capitalize font-semibold hover:bg-green-300 hover:text-black`}
              >
                <a
                  href={link.path}
                  className='flex items-center gap-3 px-6 py-3 '
                >
                  {link.icon}
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
