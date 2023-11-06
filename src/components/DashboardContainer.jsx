const DashboardContainer = ({ title, headerDiv: HeaderDiv, children }) => {
  return (
    <article className='rounded-lg bg-white w-full'>
      <header className='border-b p-4 flex justify-between'>
        <h2 className='font-semibold'>{title}</h2>
        {HeaderDiv && <HeaderDiv />}
      </header>
      <div className='p-4 w-[95vw] mx-auto md:w-full h-[15rem]'>{children}</div>
    </article>
  );
};
export default DashboardContainer;
