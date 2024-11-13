import RenderVenues from "../components/ui/RenderVenues";

function Venues(): React.ReactElement {
  return (
    <div>
      <h1 className="text-center mt-40 font-extrabold">
        Find A Place To Stay Today!
      </h1>
      <RenderVenues />
    </div>
  );
}

export default Venues;
