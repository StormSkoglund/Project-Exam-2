import { Link } from "react-router-dom";

function ProfileCustomer(): React.ReactElement {
  return (
    <div>
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
