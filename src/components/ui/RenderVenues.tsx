import { Link } from "react-router-dom";
import useVenues from "../../hooks/useFetchedVenues";
import { Venue } from "../../hooks/useFetchedVenues";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import shortenText from "../../utils/shortenText";

function RenderVenues() {
  const { isLoading, isError, data, error } = useVenues();
  const [visibleCount, setVisibleCount] = useState(9);

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

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 18);
  };

  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.slice(0, visibleCount).map((venue: Venue) => {
          const shortVenueName = shortenText(venue.name, 25);
          return (
            <li
              key={venue.id}
              className="flex justify-center align-center m-2 relative"
            >
              <Link to={`/venuepage/${venue.id}`}>
                {venue.media.length > 0 ? (
                  <div className="relative w-72 h-80 md:w-full md:h-96 xl:w-80 xl:h-96 hover:shadow-2xl hover:scale-105 duration-150">
                    <img
                      className="w-full h-full object-cover rounded-md shadow-lg"
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900 bg-opacity-35 rounded-md">
                      <div className="flex flex-col mt-60 w-8/12">
                        <span className="text-white text-center font-medium font-montserrat -mt-10">
                          {venue.location?.country}
                        </span>
                        <div className="text-center">
                          <span className="text-white font-bold font-montserrat text-nowrap">
                            {shortVenueName}
                          </span>
                        </div>
                        <div className="flex flex-row justify-end">
                          <span className="text-white font-semibold -mr-5 font-montserrat">
                            $ {venue.price}
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
                      <button
                        aria-label="Booking Button"
                        className="px-4 py-2 bg-theme-green -mt-12 mb-5 z-10 text-white font-large rounded-md"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col align-middle space-y-10 items-center justify-center mt-10">
                    <div className="mb5">{venue.name}</div>
                    <FaGlobe className="text-2xl text-theme-blue mx-5 hover:drop-shadow-2xl" />
                    <p>Sorry, no image available!</p>
                    <button
                      aria-label="Toggle Venue No Image"
                      className="px-2 md:px-4 py-2 border-solid border-2 shadow-md hover:shadow-2xl text-slate-800"
                    >
                      Visit Anyway
                    </button>
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      {visibleCount < data.length && (
        <div className="flex flex-row justify-center m-5">
          <button
            aria-label="Toggle Show More Venues"
            onClick={handleShowMore}
            className="px-4 py-2 bg-theme-blue text-white font-large rounded-md mx-auto"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default RenderVenues;
