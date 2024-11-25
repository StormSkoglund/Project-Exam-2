import { useParams } from "react-router-dom";
import SkeletonSingleVenue from "./ui/loaders/SkeletonSingleVenue";
import useVenueWithBookings from "../hooks/useVenueWithBookings";
import { CalcRatings } from "./calculators/CalcRatings";

function DisplayVenueBooking() {
  const { venueId } = useParams<{ venueId: string }>();
  const {
    data: venue,
    isLoading,
    isError,
    refetch,
  } = useVenueWithBookings(venueId || "");

  if (isLoading) {
    return <SkeletonSingleVenue />;
  }

  if (isError) {
    return <div>Venue not found</div>;
  }

  if (!venue) {
    refetch();
  }

  if (venue) {
    return (
      <div className="flex flex-col items-evenly mt-10">
        <div className="w-full flex flex-col xl:flex-row justify-evenly items-center">
          <div className="relative w-full md:w-4/12 lg:w-6/12 p-5">
            {venue.media.length > 0 ? (
              <img
                className="w-full h-auto object-cover rounded-md shadow-lg"
                src={venue.media[0].url}
                alt={venue.media[0].alt}
              />
            ) : (
              <img
                className="w-full h-auto object-cover rounded-md shadow-lg"
                src="/assets/hero-image-holistay-min.png"
                alt="A beach view from a bungalow's porch"
              />
            )}
          </div>
          <div className="flex flex-col w-10/12 lg:w-5/12 items-center align-end justify-evenly md:items-start border-solid border-2 border-slate-400 shadow-sm p-5 rounded-lg m5">
            <div className="text-slate-800 text-4xl md:text-5xl lg:text-7xl font-extrabold mb-5">
              {venue.name}
              <CalcRatings rating={venue.rating} />
            </div>
            <p className="text-slate-800 w-10/12 text-base md:text-lg lg:text-xl font-base mb-5">
              {venue.description}
            </p>
            <div className="text-slate-900 text-base md:text-lg lg:text-xl font-bold mb-2">
              {venue.location?.city}
            </div>
            <div className="text-slate-800 text-base md:text-lg lg:text-xl font-bold mb-2">
              {venue.location?.country}
            </div>
            <div className="flex flex-row items-center md:items-start">
              <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-bold mb-2 pe-10">
                {venue.name}
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-slate-800 text-base md:text-lg lg:text-2xl font-bold">
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
