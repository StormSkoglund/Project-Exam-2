import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import UserProfile from "../components/profiles/UserProfile";

function ProfileManager(): React.ReactElement {
  return (
    <div>
      <Helmet>
        <title>Holistay | User Profile</title>
        <meta
          name="description"
          content="Welcome to the Holistay Administrator Rental Management portal. Create venues, or manage your existing ones."
        />
      </Helmet>
      <h1 className="text-center font-normal text-5xl mt-40">User Profile</h1>
      <UserProfile />
      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default ProfileManager;
