import { useNavigate } from "react-router-dom";
import useProfileQuery from "../../hooks/useProfilesQuery";
import useMyStore from "../../store";
import CreateVenue from "./CreateVenue";

function UserProfile() {
  const { data: profile, isLoading, isError, error } = useProfileQuery();
  const { isLoggedIn } = useMyStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
          <p className="block text-theme-blue mb-2 p-3 border-b-2 border-solid text-center">
            Email: {profile.email}
          </p>
          {profile?.bio && (
            <div className="border-2 border-solid">{profile.bio}</div>
          )}
          <CreateVenue />
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
          {profile?.bio && (
            <div className="border-2 border-solid">{profile.bio}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
