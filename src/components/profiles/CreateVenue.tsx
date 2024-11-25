import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVenueSchema, CreateVenueType } from "./createvenueSchema";
import { postCreateVenue } from "./postCreateVenue";
import { useId } from "react";

function CreateVenue() {
  const nameId = useId();
  const descriptionId = useId();
  const mediaUrlId = useId();
  const mediaAltId = useId();
  const priceId = useId();
  const maxGuestsId = useId();
  const ratingId = useId();
  const wifiId = useId();
  const parkingId = useId();
  const breakfastId = useId();
  const petsId = useId();
  const addressId = useId();
  const cityId = useId();
  const zipId = useId();
  const countryId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVenueType>({ resolver: yupResolver(createVenueSchema) });
  const onSubmit = async (data: CreateVenueType) => {
    const completeData: CreateVenueType = {
      ...data,
      rating: data.rating ?? 0,
      meta: {
        wifi: data.meta?.wifi ?? false,
        parking: data.meta?.parking ?? false,
        breakfast: data.meta?.breakfast ?? false,
        pets: data.meta?.pets ?? false,
      },
      location: {
        address: data.location?.address ?? null,
        city: data.location?.city ?? null,
        zip: data.location?.zip ?? null,
        country: data.location?.country ?? null,
        continent: data.location?.continent ?? null,
        lat: data.location?.lat ?? 0,
        lng: data.location?.lng ?? 0,
      },
    };
    try {
      const response = await postCreateVenue(completeData);
      console.log(response);
      reset();
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md relative">
        <h2 className="text-3xl font-bold text-center">Create Venue</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor={nameId}
              className="block text-sm font-medium text-gray-700"
            >
              Venue Name*
            </label>
            <input
              type="text"
              id={nameId}
              {...register("name")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor={descriptionId}
              className="block text-sm font-medium text-gray-700"
            >
              Description*
            </label>
            <textarea
              id={descriptionId}
              {...register("description")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={mediaUrlId}
              className="block text-sm font-medium text-gray-700"
            >
              Media URL
            </label>
            <input
              type="url"
              id={mediaUrlId}
              {...register("media.0.url")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.media?.[0]?.url && (
              <p className="mt-2 text-sm text-red-500">
                {errors.media[0].url.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={mediaAltId}
              className="block text-sm font-medium text-gray-700"
            >
              Media Alt Text
            </label>
            <input
              type="text"
              id={mediaAltId}
              {...register("media.0.alt")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.media?.[0]?.alt && (
              <p className="mt-2 text-sm text-red-500">
                {errors.media[0].alt.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={priceId}
              className="block text-sm font-medium text-gray-700"
            >
              Price*
            </label>
            <input
              type="number"
              id={priceId}
              {...register("price")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={maxGuestsId}
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Guests*
            </label>
            <input
              type="number"
              id={maxGuestsId}
              {...register("maxGuests")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.maxGuests && (
              <p className="mt-2 text-sm text-red-500">
                {errors.maxGuests.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={ratingId}
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              type="number"
              id={ratingId}
              {...register("rating")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.rating && (
              <p className="mt-2 text-sm text-red-500">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={wifiId}
              {...register("meta.wifi")}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={wifiId}
              className="ml-2 block text-sm text-gray-900"
            >
              Wifi
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={parkingId}
              {...register("meta.parking")}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={parkingId}
              className="ml-2 block text-sm text-gray-900"
            >
              Parking
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={breakfastId}
              {...register("meta.breakfast")}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={breakfastId}
              className="ml-2 block text-sm text-gray-900"
            >
              Breakfast
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={petsId}
              {...register("meta.pets")}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={petsId}
              className="ml-2 block text-sm text-gray-900"
            >
              Pets
            </label>
          </div>
          <div>
            <label
              htmlFor={addressId}
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id={addressId}
              {...register("location.address")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.location?.address && (
              <p className="mt-2 text-sm text-red-500">
                {errors.location.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={cityId}
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id={cityId}
              {...register("location.city")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.location?.city && (
              <p className="mt-2 text-sm text-red-500">
                {errors.location.city.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={zipId}
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code
            </label>
            <input
              type="text"
              id={zipId}
              {...register("location.zip")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.location?.zip && (
              <p className="mt-2 text-sm text-red-500">
                {errors.location.zip.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={countryId}
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id={countryId}
              {...register("location.country")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.location?.country && (
              <p className="mt-2 text-sm text-red-500">
                {errors.location.country.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Venue
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;
