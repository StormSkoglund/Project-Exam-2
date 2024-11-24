import DisplaySingleVenue from "../components/DisplaySingleVenue";

function VenuePage(): React.ReactElement {
  return (
    <div>
      <h1 className="mt-40 mb-5 text-center font-normal text-5xl">
        Detailed Overview
      </h1>
      <DisplaySingleVenue />
    </div>
  );
}

export default VenuePage;
