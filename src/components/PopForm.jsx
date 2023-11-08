import { useGloableContext } from '../GloableContext';

const PopForm = () => {
  const { setIsModalOpen } = useGloableContext();
  return (
    <div className='fixed inset-0 min-h-screen grid place-content-center bg-[rgba(0,0,0,0.2)] z-10'>
      <form className='bg-white w-96 h-56 grid place-content-center rounded-lg '>
        <h4 className=' mb-8 text-center capitalize'>Invoice upload form</h4>
        <div className='mb-8 '>
          <input
            type='file'
            name='invoice'
            id='invoice'
            className='block w-full  border border-green-500 rounded-md focus:outline-none file:text-gray-50 file:bg-green-900 file:px-2 file:py-1 '
          />
        </div>
        <div className='flex justify-between'>
          <button
            type='submit'
            className='border border-green-500 py-1 px-4 rounded-lg capitalize font-semibold hover:bg-green-300 hover:text-gray-100'
            disabled
          >
            submit
          </button>
          <button
            type='button'
            onClick={() => setIsModalOpen(false)}
            className='border border-red-500 py-1 px-4 rounded-lg capitalize font-semibold hover:bg-red-300 hover:text-gray-100'
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default PopForm;
