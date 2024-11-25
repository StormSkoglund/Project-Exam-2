import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function ProfileCustomer(): React.ReactElement {
  return (
    <div>
      <Helmet>
        <title>Holistay | Profile</title>
        <meta
          name="description"
          content="Welcome to your personalized Holistay profile. Manage your bookings and explore new opportunities here."
        />
      </Helmet>
      <h1>Customer Profile</h1>

      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default ProfileCustomer;
