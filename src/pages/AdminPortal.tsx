import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CreateVenue from "../components/profiles/CreateVenue";

function AdminPortal(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>Holistay | Admin Portal</title>
        <meta
          name="description"
          content="Welcome to the Holistay Administrator Rental Management portal. Create new venues here."
        />
      </Helmet>
      <div>
        <h1 className="text-5xl mt-40 mb-2">Rental Management Portal</h1>
        <div className="text-center">
          <CreateVenue />
          <Link to="/">
            <p className="font-semibold">Home</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminPortal;
