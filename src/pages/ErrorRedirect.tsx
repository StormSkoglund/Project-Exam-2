import { Link } from "react-router-dom";

function ErrorRedirect(): React.ReactElement {
  return (
    <div>
      <h1>An error has occoured</h1>
      <div className="text-center text-white bg-red-500 p-10 rounded-xl mx-auto">
        Return
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default ErrorRedirect;
