import { useParams, Link } from "react-router-dom";
import SkeletonSingleVenue from "./ui/loaders/SkeletonSingleVenue";
import useApiQuery from "../hooks/useApiQuery";
import { CalcRatings } from "./calculators/CalcRatings";
import { FaGlobe } from "react-icons/fa";
import shortenText from "../utils/shortenText";

function DisplaySingleVenue() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useApiQuery(id);

  if (isLoading) {
    return <SkeletonSingleVenue />;
  }

  if (isError) {
    return <div>Venue not found</div>;
  }

  if (data) {
    const shortName = shortenText(data.name, 20);
    const shortDescription = shortenText(data.description, 1000);

    return (
      <div className="flex flex-col items-evenly mt-5">
        <div className="w-full flex flex-col xl:flex-row justify-evenly items-center">
          <div className="relative w-full md:w-8/12 lg:w-10/12 p-5">
            {data.media.length > 0 ? (
              <img
                className="w-full h-auto object-cover rounded-md shadow-lg"
                src={data.media[0].url}
                alt={data.media[0].alt}
              />
            ) : (
              <div className="flex flex-row align-middle items-center justify-center">
                <FaGlobe className="text-2xl text-theme-blue mx-5" />
                <p>Sorry, no image available!</p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-10/12 lg:w-5/12 items-center flex-wrap align-end justify-evenly md:items-center border-solid border-2 border-slate-400 shadow-sm p-5 rounded-lg m-5">
            <div className="text-slate-800 text-l mx-auto md:text-4xl lg:text-3xl text-center font-extrabold mb-5 text-wrap">
              {shortName}
              <CalcRatings rating={data.rating} />
            </div>
            <p className="text-slate-800 text-xs md:text-lg lg:text-xl font-semibold mb-5">
              {shortDescription}
            </p>
            <div className="text-slate-800 text-base md:text-lg lg:text-xl font-semibold mb-3">
              {data.location?.address}
            </div>
            <div className="text-slate-900 text-base font-bold md:text-lg lg:text-lg mb-1">
              {data.location?.city}
            </div>
            <div className="text-slate-800 text-base md:text-lg lg:text-xl font-medium mb-5">
              {data.location?.country}
            </div>

            <div className="border-2 p-4">
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
                Parking: {data.meta.parking ? "Yes" : "No"}
              </div>
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
                WiFi: {data.meta.wifi ? "Yes" : "No"}
              </div>
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
                Pets Allowed: {data.meta.pets ? "Yes" : "No"}
              </div>
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-5">
                Breakfast: {data.meta.breakfast ? "Yes" : "No"}
              </div>
            </div>
            <div className="flex flex-row items-center md:items-start">
              <div className="block mx-auto text-center">
                <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-bold">
                  ${data.price}
                </div>
                <div className="text-slate-800 text-sm md:text-base lg:text-lg font-medium mb-5">
                  Per Night
                </div>
              </div>
            </div>
            <Link to={`/booking/${id}`}>
              <button
                aria-label="booking navigation"
                className="px-4 py-2 bg-theme-green text-white font-large rounded-md"
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-10/12 mx-auto mt-5 mb-5">
          {data.media.slice(1, 4).map((mediaItem, index) => (
            <img
              key={index}
              className="w-full h-auto object-cover rounded-md shadow-lg"
              src={mediaItem?.url}
              alt={mediaItem?.alt}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default DisplaySingleVenue;
