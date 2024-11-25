/*import DateSelection from "../components/ui/forms/booking/DateSelection";
import useApiQuery from "../hooks/useApiQuery";

function calculateTotal(venueId) {
  const { data: venue } = useApiQuery(venueId);
  const selectedDates = DateSelection();
  if (venue && selectedDates.length > 0) {
    const price = venue.price;
    const numberOfDays = selectedDates.length;
    return price * numberOfDays;
  }
  return 0;
}

export default calculateTotal;*/
