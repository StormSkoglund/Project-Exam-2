import { Link } from "react-router-dom";

function VenuePage(): React.ReactElement {
  return (
    <div>
      <h1>Detailed Overview</h1>
      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default VenuePage;
