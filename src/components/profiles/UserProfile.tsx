import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfileQuery from "../../hooks/useProfilesQuery";
import useMyStore from "../../store";
import useVenuesByProfileQuery from "../../hooks/useVenuesProfileQuery";
import { Booking, Venue } from "../../utils/interfaces";
import moment from "moment";
import RenderProfileBooking from "./RenderProfileBooking";
import CreateVenueModal from "../ui/forms/modals/CreateVenueModal";
import UpdateAvatarModal from "../ui/forms/modals/UpdateAvatarModal";
import UpdateVenueModal from "../ui/forms/modals/UpdateVenueModal";
import deleteVenue from "../../features/auth/deleteVenue";

function UserProfile() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useProfileQuery({ _bookings: true });
  const {
    data: venues,
    isLoading: isVenuesLoading,
    isError: isVenuesError,
    error: venuesError,
  } = useVenuesByProfileQuery({ _owner: true, _bookings: true });
  const {
    isLoggedIn,
    handleOpenCreateVenue,
    handleOpenUpdateAvatar,
    handleOpenUpdateVenue,
    handleCloseUpdateVenue,
  } = useMyStore();
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const handleDeleteVenue = async (venueId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteVenue(venueId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  if (isProfileLoading || isVenuesLoading) {
    return <div>Loading...</div>;
  }

  if (isProfileError) {
    return <div>Error: {profileError.message}</div>;
  }

  if (isVenuesError) {
    return <div>Error: {venuesError.message}</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="container mx-auto">
      {profile?.venueManager ? (
        <div>
          <h2 className="text-4xl text-center m-4">Venue Manager</h2>
          <div className="block mx-auto">
            {profile.avatar && (
              <img
                src={profile.avatar.url}
                alt={profile.avatar.alt}
                className="w-36 h-36 object-cover rounded-full mx-auto"
              />
            )}
          </div>
          <div className="text2xl text-center m-4">
            Welcome, {profile.name}!
          </div>
          <p className="block text-theme-blue mb-2 p-3 border-solid text-center">
            Email: {profile.email}
          </p>
          <button
            onClick={handleOpenUpdateAvatar}
            aria-label="Toggle Avatar Updater"
            className="bg-yellow-700 block mx-auto text-white px-4 py-2 rounded-md "
          >
            Update Avatar
          </button>
          <UpdateAvatarModal />
          {profile?.bio && (
            <div className="border-2 border-solid">{profile.bio}</div>
          )}
          <div className="border-solid border-2 m-10">
            <h3 className="text-2xl text-center m-10">Managed Venues</h3>
            <button
              onClick={handleOpenCreateVenue}
              aria-label="Toggle Create Venue"
              className="text-center block m-5 bg-theme-green mx-auto text-white px-4 py-2 rounded-md"
            >
              Create Venue
            </button>
            <CreateVenueModal />

            {venues && venues.length > 0 ? (
              venues.map((venue: Venue) => (
                <div
                  key={venue.id}
                  className="border text-white p-4 mb-4 w-10/12 sm:w-6/12 mx-auto bg-theme-blue rounded-lg shadow-2xl"
                >
                  {venue.media && venue.media.length > 0 && (
                    <img
                      className="w-64 float-right shadow-xl rounded-2xl"
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                    />
                  )}
                  <h4 className="text-xl mb-5">{venue.name}</h4>
                  <p className="p-2 ">{venue.description}</p>
                  <p className="px-2 font-semibold">{venue.location.address}</p>
                  <p className="px-2 font-semibold">{venue.location.country}</p>
                  <p className="px-2 pb-2 font-semibold">
                    {venue.location.city}
                  </p>
                  <p className=" p-2 font-normal">Price: {venue.price}</p>
                  <p className=" p-2 font-normal">
                    Max Guests: {venue.maxGuests}
                  </p>
                  <p className=" p-2 font-normal">Rating: {venue.rating}</p>
                  <p className=" p-2 font-normal textt-center">
                    Bookings By Users:
                  </p>
                  {venue.bookings && venue.bookings.length > 0 ? (
                    venue.bookings.map((booking: Booking) => (
                      <div
                        key={booking.id}
                        className="p-2 text-center border-solid border-2 text-white font-bold"
                      >
                        <p className=" p-2 font-bold">
                          Booking ID: {booking.id}
                        </p>
                        <p className=" p-2 font-normal">
                          From: {moment(booking.dateFrom).format("YYYY-MM-DD ")}
                        </p>
                        <p className=" p-2 font-normal">
                          To: {moment(booking.dateTo).format("YYYY-MM-DD ")}
                        </p>
                        <p className=" p-2 font-normal">
                          Guests: {booking.guests}
                        </p>
                        <p className=" p-2 font-normal">
                          Customer: {booking.customer.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-center text-white font-bold">
                      No bookings for this venue.
                    </p>
                  )}{" "}
                  <div className="flex flex-row justify-between">
                    <button
                      aria-label="Venue Update"
                      onClick={() => {
                        setSelectedVenue(venue);
                        handleOpenUpdateVenue();
                      }}
                      className="bg-yellow-700 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Update Venue
                    </button>
                    <button
                      aria-label="Delete Venue"
                      onClick={() => handleDeleteVenue(venue.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
                    >
                      Delete Venue
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center m-5 border-solid p-3 border-2">
                There are currently no venues associated with this account.
              </p>
            )}
          </div>
          {selectedVenue && (
            <UpdateVenueModal
              venue={selectedVenue}
              onClose={() => {
                setSelectedVenue(null);
                handleCloseUpdateVenue();
              }}
            />
          )}
          <RenderProfileBooking />
        </div>
      ) : (
        <div>
          <h2 className="text-4xl text-center m-4">Customer Profile</h2>
          <div className="block mx-auto">
            {profile.avatar && (
              <img
                src={profile.avatar.url}
                alt={profile.avatar.alt}
                className="w-36 h-36 object-cover rounded-full mx-auto"
              />
            )}
          </div>
          <div className="text2xl text-center m-4">
            Welcome, {profile.name}!
          </div>
          <p className="block text-theme-blue mb-2 p-3 border-b-2 border-solid text-center">
            Email: {profile.email}
          </p>
          <button
            aria-label="Toggle Update Avatar"
            onClick={handleOpenUpdateAvatar}
            className="bg-yellow-700 mx-auto block m-5 text-white px-4 py-2 rounded-md"
          >
            Update Avatar
          </button>
          <UpdateAvatarModal />
          {profile?.bio && (
            <div className="border-2 border-solid">{profile.bio}</div>
          )}
          <RenderProfileBooking />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
