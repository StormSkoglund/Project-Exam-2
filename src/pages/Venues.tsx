import { Link } from "react-router-dom";

function Venues(): React.ReactElement {
  return (
    <div>
      <h1>Find A Place To Stay Today!</h1>
      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default Venues;
