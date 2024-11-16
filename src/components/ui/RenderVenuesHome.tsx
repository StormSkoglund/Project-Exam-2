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
    <div className="w-full flex flex-wrap justify-center m-auto mt-10">
      <ul className="flex flex-wrap justify-center gap-5">
        {slicedMap.map((result: Venue, index: number) => (
          <li key={index} className="flex justify-center items-center relative">
            {result.media.length > 0 ? (
              <div className="relative w-32 h-60 md:w-40 md:h-60 xl:w-72 xl:h-96">
                <img
                  className="w-full h-full object-cover rounded-md shadow-lg"
                  src={result.media[0].url}
                  alt={result.media[0].alt}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-md">
                  <span className="text-white absolute bottom-4 font-extrabold">
                    {result.name}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative w-32 h-60 md:w-40 md:h-60 xl:w-72 xl:h-96">
                <img
                  className="w-full h-full object-cover rounded-md shadow-lg"
                  src="/assets/hero-image-holistay-min.png"
                  alt="A beach view from a bungalow's porch"
                />
                <span className="text-white absolute bottom-4 font-extrabold">
                  No image available
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RenderVenuesHome;
