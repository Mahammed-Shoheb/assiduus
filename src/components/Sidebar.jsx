import { useState } from 'react';
import { sidebarLinks } from '../assets/data';
import logo from '../assets/assiduus-logo-dark.webp';

const Sidebar = () => {
  const [linkSelected, setLinkSelected] = useState(0);
  return (
    <aside className='bg-white hidden lg:block min-h-[100vh] w-[12rem] shadow-[1px_0_0_0_rgba(0,0,0,0.1)]'>
      <div className='h-[4rem] grid place-content-center'>
        <img src={logo} alt='assiduus logo' className='w-40  hidden lg:block' />
      </div>
      <nav className='mt-10'>
        <ul className='grid'>
          {sidebarLinks.map((link, index) => {
            return (
              <li
                onClick={() => setLinkSelected(index)}
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
