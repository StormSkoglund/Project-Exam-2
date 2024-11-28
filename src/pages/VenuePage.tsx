import { Helmet } from "react-helmet-async";
import DisplaySingleVenue from "../components/DisplaySingleVenue";

function VenuePage(): React.ReactElement {
  return (
    <div>
      <Helmet>
        <title>Holistay | Detailed Overview</title>
        <meta name="description" content="Venue details." />
      </Helmet>
      <h1 className="mt-40 mb-5 text-center font-normal text-5xl">
        Detailed Overview
      </h1>
      <DisplaySingleVenue />
    </div>
  );
}

export default VenuePage;
