import { Link } from "react-router-dom";

function ErrorRedirect(): React.ReactElement {
  return (
    <div>
      <h1>An error has occoured</h1>
      <div className="text-center">
        Return{" "}
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default ErrorRedirect;
