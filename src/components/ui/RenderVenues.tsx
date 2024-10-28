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
    <ul>
      {data.map((venue: Venue) => (
        <li
          className="inline-flex justify-center align-center flex-row m-5 relative"
          key={venue.id}
        >
          {venue.media.length > 0 ? (
            <div className="relative w-60 h-72">
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
            <span>No image available</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default RenderVenues;
