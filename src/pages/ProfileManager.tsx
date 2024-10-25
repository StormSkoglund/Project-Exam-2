import { Link } from "react-router-dom";

function ProfileManager(): React.ReactElement {
  return (
    <div>
      <h1>Manager Profile</h1>
      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default ProfileManager;
