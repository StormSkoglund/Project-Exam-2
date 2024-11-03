import { Link } from "react-router-dom";

function Booking(): React.ReactElement {
  return (
    <div>
      <h1>Booking Portal</h1>

      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default Booking;
