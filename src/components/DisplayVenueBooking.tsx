import { useParams } from "react-router-dom";
import useVenueWithBookings from "../hooks/useVenueWithBookings";
import { CalcRatings } from "./calculators/CalcRatings";
import { FaGlobe } from "react-icons/fa";
import shortenText from "../utils/shortenText";
import SkeletonVenueBooking from "./ui/loaders/SkeletonVenueBooking";

function DisplayVenueBooking() {
  const { venueId } = useParams<{ venueId: string }>();
  const {
    data: venue,
    isLoading,
    isError,
    refetch,
  } = useVenueWithBookings(venueId || "");

  if (isLoading) {
    return <SkeletonVenueBooking />;
  }

  if (isError) {
    return <div>Venue not found</div>;
  }

  if (!venue) {
    refetch();
  }

  if (venue) {
    const shortName = shortenText(venue.name, 15);
    const shortDescription = shortenText(venue.description, 1000);

    return (
      <div className="flex flex-col items-evenly mt-10">
        <div className="w-full flex flex-col xl:flex-row justify-evenly items-center">
          <div className="relative w-10/12 md:w-8/12 lg:w-7/12 p-5">
            {venue.media.length > 0 ? (
              <img
                className="w-2/3 h-auto object-cover rounded-md shadow-lg mx-auto"
                src={venue.media[0].url}
                alt={venue.media[0].alt}
              />
            ) : (
              <div className="flex flex-col align-middle space-y-10 items-center justify-center mt-10">
                <FaGlobe className="text-2xl text-theme-blue mx-5 hover:drop-shadow-2xl" />
                <p>Sorry, no photos available!</p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-10/12 lg:w-5/12 items-center align-end justify-evenly md:items-center border-solid border-2 border-slate-400 shadow-sm p-5 rounded-lg m5">
            <div className="text-slate-800 text-4xl md:text-lg lg:text-4xl font-extrabold mb-5">
              {shortName}
              <CalcRatings rating={venue.rating} />
            </div>
            <p className="text-slate-800 text-base md:text-lg lg:text-lg font-base mb-5">
              {shortDescription}
            </p>
            <div className="text-slate-900 text-base md:text-lg font-semibold mb-2">
              {venue.location?.address}
            </div>
            <div className="text-slate-900 text-base md:text-lg font-semibold mb-2">
              {venue.location?.city}
            </div>
            <div className="text-slate-800 text-base md:text-lg font-base mb-2">
              {venue.location?.country}
            </div>
            <div className="border-2 p-4">
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
                Parking: {venue.meta.parking ? "Yes" : "No"}
              </div>
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
                WiFi: {venue.meta.wifi ? "Yes" : "No"}
              </div>
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-2">
                Pets Allowed: {venue.meta.pets ? "Yes" : "No"}
              </div>
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-medium mb-5">
                Breakfast: {venue.meta.breakfast ? "Yes" : "No"}
              </div>
            </div>
            <div className="flex flex-row items-center md:items-end">
              <div className="flex flex-col items-center">
                <div className="text-slate-800 text-base md:text-lg lg:text-lg font-bold">
                  ${venue.price}
                </div>
                <div className="text-slate-800 text-sm md:text-base lg:text-lg font-medium mb-10">
                  Per Night
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-8/12 mx-auto mt-5 mb-5">
          {venue.media.slice(1, 4).map((mediaItem, index) => (
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

export default DisplayVenueBooking;
