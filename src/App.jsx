import {
  Dashboard,
  Header,
  PopForm,
  Sidebar,
  SmallSidebar,
} from './components';
import { useGloableContext } from './GloableContext';

const App = () => {
  const { isModalOpen } = useGloableContext();
  return (
    <main className='bg-gray-50 grid grid-cols-[auto,1fr]'>
      <Sidebar />
      {isModalOpen && <PopForm />}
      <SmallSidebar />
      <div>
        <Header />
        <Dashboard />
      </div>
    </main>
  );
};
export default App;
