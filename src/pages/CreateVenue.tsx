import { Link } from "react-router-dom";

function CreateVenue(): React.ReactElement {
  return (
    <div>
      <h1>Rental Management Portal</h1>
      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default CreateVenue;
