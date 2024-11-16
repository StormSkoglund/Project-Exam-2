import { useParams } from "react-router-dom";
import SkeletonSingleVenue from "../../components/ui/loaders/SkeletonSingleVenue";
import useApiQuery from "../../hooks/useApiQuery";

function DisplaySingleVenue() {
  const { id } = useParams();

  const { data, isLoading, isError } = useApiQuery(id);

  if (isLoading) {
    return <SkeletonSingleVenue />;
  }

  if (isError) {
    return <div>Venue not found</div>;
  }

  if (data) {
    return (
      <div className="w-full flex flex-wrap justify-center mt-10">
        <div className="flex justify-center align-center m-5 relative">
          {data.media.length > 0 ? (
            <div className="relative w-36 h-64 md:w-40 md:h-60 xl:w-72 xl:h-96">
              <img
                className="w-full h-full object-cover rounded-md shadow-lg"
                src={data.media[0].url}
                alt={data.media[0].alt}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-md">
                <span className="text-white absolute mt-56 font-extrabold">
                  {data.name}
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
        </div>
      </div>
    );
  }

  return null;
}

export default DisplaySingleVenue;
