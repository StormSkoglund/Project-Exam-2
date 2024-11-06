import React from "react";
import RenderVenuesHome from "../components/ui/RenderVenuesHome";

const Home: React.FC = () => {
  return (
    <>
      <img
        src="assets/hero-image-holistay-min.png"
        alt="A beach view from a beachside-bungalow porch"
        className="w-full m-auto"
      />

      <h2 className="text-slate-900 text-lg font-semibold w-10/12 m-auto">
        A Tailored Experience
      </h2>
      <p className="text-slate-900 w-10/12 m-auto">
        If you are looking for the ideal accommodation for your holiday, look no
        further, we’ve got you covered. Our services provide a global overview
        of available places to stay, with the option to choose between a wide
        range of different amenities of your liking.
      </p>
      <RenderVenuesHome />
    </>
  );
};

export default Home;
