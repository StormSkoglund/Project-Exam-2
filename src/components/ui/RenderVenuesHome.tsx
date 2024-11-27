import { Link } from "react-router-dom";
import useVenues from "../../hooks/useFetchedVenues";
import { Venue } from "../../hooks/useFetchedVenues";
import { FaGlobe } from "react-icons/fa";

function RenderVenuesHome() {
  const { isLoading, isError, data, error } = useVenues();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    const errorMessage = (error as Error).message;
    return <span>Error: {errorMessage}</span>;
  }

  if (!data) {
    return <span>There is no data</span>;
  }

  const slicedMap = data.slice(0, 4);

  return (
    <div className="container mx-auto">
      <ul className="flex flex-wrap justify-center gap-5">
        {slicedMap.map((result: Venue, index: number) => (
          <Link key={result.id} to={`/venuepage/${result.id}`}>
            <li
              key={index}
              className="flex justify-center align-center m-2 relative"
            >
              {result.media.length > 0 ? (
                <div className="relative w-72 h-80 md:w-96 md:h-96 xl:w-80 xl:h-96 hover:shadow-2xl hover:scale-105 duration-150">
                  <img
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    src={result.media[0].url}
                    alt={result.media[0].alt}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-900 bg-opacity-35 rounded-md">
                    <div className="flex flex-col mt-60 w-8/12">
                      <span className="text-white text-center font-medium font-montserrat -mt-10">
                        {result.location?.country}
                      </span>
                      <div className="text-center">
                        <span className="text-white font-bold font-montserrat text-nowrap">
                          {result.name}
                        </span>
                      </div>
                      <div className="flex flex-row justify-end">
                        <span className="text-white font-semibold -mr-5 font-montserrat">
                          $ {result.price}
                        </span>
                      </div>
                      <div className="flex flex-row justify-end">
                        <span className="text-white text-xs -mr-5 font-medium font-montserrat">
                          Per Night
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <button className="px-2 md:px-4 py-2 bg-theme-green -mt-12 mb-5 z-10 text-white font-large rounded-md">
                      Book Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col align-middle space-y-10 items-center justify-center mt-10">
                  <FaGlobe className="text-2xl text-theme-blue mx-5 hover:drop-shadow-2xl" />
                  <p>Sorry, no image available!</p>

                  <button className="px-5 py-2 border-solid border-2 shadow-md hover:shadow-2xl text-slate-800">
                    Visit Anyway
                  </button>
                </div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default RenderVenuesHome;
