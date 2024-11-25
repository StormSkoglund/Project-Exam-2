import React, { useEffect } from "react";
import DisplayVenueBooking from "../components/DisplayVenueBooking";
import SelectBooking from "../components/ui/forms/booking/SelectBooking";
import LoginModal from "../components/ui/forms/modals/LoginModal";
import useMyStore from "../store";
import { Helmet } from "react-helmet-async";

function Booking(): React.ReactElement {
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);
  const handleOpenLogin = useMyStore((state) => state.handleOpenLogin);

  useEffect(() => {
    if (!isLoggedIn) {
      handleOpenLogin();
    }
  }, [isLoggedIn, handleOpenLogin]);

  return (
    <>
      <Helmet>
        <title>Holistay | Booking</title>
        <meta
          name="description"
          content="Book your perfect stay. Explore our brand new booking portal to plan your next getaway."
        />
      </Helmet>
      <div>
        <h1 className="text-center text-4xl mt-40">Booking Portal</h1>
        <DisplayVenueBooking />
        <SelectBooking />
        <LoginModal />
      </div>
    </>
  );
}

export default Booking;
