import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function ErrorRedirect(): React.ReactElement {
  return (
    <div>
      <Helmet>
        <title>Holistay | Error</title>
        <meta
          name="description"
          content="An error has been encountered. Please contact support if the issue persists."
        />
      </Helmet>
      <h1 className="text-center">An error has occoured</h1>
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
