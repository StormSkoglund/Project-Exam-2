function SkeletonRenderVenues() {
  return (
    <div className="container mx-auto animate-pulse">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <li
            key={index}
            className="flex justify-center align-center m-2 relative"
          >
            <div className="relative w-72 h-80 md:w-full md:h-96 xl:w-80 xl:h-96 bg-gray-300 rounded-md shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900 bg-opacity-35 rounded-md">
                <div className="flex flex-col mt-60 w-8/12">
                  <div className="w-3/4 h-6 bg-gray-300 rounded-md mb-2"></div>
                  <div className="w-1/2 h-6 bg-gray-300 rounded-md mb-2"></div>
                  <div className="flex flex-row justify-end">
                    <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
                  </div>
                  <div className="flex flex-row justify-end">
                    <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <button
                  aria-label="Booking Button"
                  className="px-4 py-2 bg-gray-300 text-white font-large rounded-md mt-5"
                >
                  <div className="w-full h-6 bg-gray-300 rounded-md"></div>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonRenderVenues;
