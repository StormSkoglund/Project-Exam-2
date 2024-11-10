import useVenues from "../../hooks/useFetchedVenues";
import { Venue } from "../../hooks/useFetchedVenues";

function RenderVenues() {
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

  return (
    <div className="w-full flex flex-wrap justify-center mt-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.slice(0, 9).map((venue: Venue) => (
          <li
            key={venue.id}
            className="flex justify-center align-center m-5 relative"
          >
            {venue.media.length > 0 ? (
              <div className="relative w-36 h-64 md:w-40 md:h-60 xl:w-72 xl:h-96">
                <img
                  className="w-full h-full object-cover rounded-md shadow-lg"
                  src={venue.media[0].url}
                  alt={venue.media[0].alt}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-md">
                  <span className="text-white absolute mt-56 font-extrabold">
                    {venue.name}
                  </span>
                </div>
              </div>
            ) : (
              <img
                className="w-full h-full object-cover rounded-md shadow-lg"
                src="/assets/hero-image-holistay-min.png"
                alt="A beach view from a bungalow's porch"
              >
                No image available
              </img>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RenderVenues;
