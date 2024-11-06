import useVenues from "../../hooks/useFetchedVenues";
import { Venue } from "../../hooks/useFetchedVenues";

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
    <div className="w-12/12 flex flex-row align-middle justify-center m-auto mt-10">
      <ul className="flex flex-row space-x-2">
        {slicedMap.map((result: Venue, index: number) => (
          <li key={index} className="inline-flex">
            {result.media.length > 0 ? (
              <div className="relative w-40 h-60">
                <img
                  className="w-full h-full object-cover rounded-md shadow-lg"
                  src={result.media[0].url}
                  alt={result.media[0].alt}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-md">
                  <span className="text-white absolute mt-56 font-extrabold">
                    {result.name}
                  </span>
                </div>
              </div>
            ) : (
              <span>No image available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RenderVenuesHome;
