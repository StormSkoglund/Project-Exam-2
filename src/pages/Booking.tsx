import SelectBooking from "../components/ui/forms/booking/SelectBooking";
import DisplaySingleVenue from "../features/auth/DisplaySingleVenue";

function Booking(): React.ReactElement {
  return (
    <>
      <DisplaySingleVenue />
      <div>
        <h1 className="text-center text-4xl mt-40">Booking Portal</h1>
        <SelectBooking />
      </div>
    </>
  );
}

export default Booking;
