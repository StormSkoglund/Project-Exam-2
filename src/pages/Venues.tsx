import { Helmet } from "react-helmet-async";
import RenderVenues from "../components/ui/RenderVenues";

function Venues(): React.ReactElement {
  return (
    <div>
      <Helmet>
        <title>Holistay | All Venues</title>
        <meta
          name="description"
          content="Here you will find all available venuesS"
        />
      </Helmet>
      <h1 className="mt-40 text-5xl text-center">
        Find A Place To Stay Today!
      </h1>
      <RenderVenues />
    </div>
  );
}

export default Venues;
