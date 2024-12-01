function SkeletonVenueBooking() {
  return (
    <div className="flex flex-col items-evenly mt-10 animate-pulse">
      <div className="w-full flex flex-col xl:flex-row justify-evenly items-center">
        <div className="relative w-10/12 md:w-8/12 lg:w-7/12 p-5">
          <div className="w-full h-80 bg-gray-300 rounded-md shadow-lg"></div>
        </div>
        <div className="flex flex-col w-10/12 lg:w-5/12 items-center align-end justify-evenly md:items-center border-solid border-2 border-slate-400 shadow-sm p-5 rounded-lg m5">
          <div className="text-slate-800 text-4xl md:text-2xl lg:text-4xl font-extrabold mb-5">
            <div className="w-3/4 h-8 bg-gray-300 rounded-md mb-2"></div>
            <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
          </div>
          <p className="text-slate-800 w-10/12 text-base md:text-lg lg:text-lg font-base mb-5">
            <div className="w-full h-24 bg-gray-300 rounded-md"></div>
          </p>
          <div className="text-slate-900 text-base md:text-lg font-semibold mb-2">
            <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>
          </div>
          <div className="text-slate-900 text-base md:text-lg font-semibold mb-2">
            <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
          </div>
          <div className="text-slate-800 text-base md:text-lg font-base mb-2">
            <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
          </div>
          <div className="border-2 p-4 w-full">
            <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
              <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
            </div>
            <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
              <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
            </div>
            <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
              <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
            </div>
            <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-5">
              <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-row items-center md:items-end">
            <div className="flex flex-col items-center">
              <div className="text-slate-800 text-base md:text-lg lg:text-lg font-bold">
                <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
              </div>
              <div className="text-slate-800 text-sm md:text-base lg:text-lg font-medium mb-10">
                <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-8/12 mx-auto mt-5 mb-5">
        <div className="w-full h-40 bg-gray-300 rounded-md shadow-lg"></div>
        <div className="w-full h-40 bg-gray-300 rounded-md shadow-lg"></div>
        <div className="w-full h-40 bg-gray-300 rounded-md shadow-lg"></div>
      </div>
    </div>
  );
}

export default SkeletonVenueBooking;