import React from "react";
import RenderVenuesHome from "../components/ui/RenderVenuesHome";

const Home: React.FC = () => {
  return (
    <>
      <img
        src="assets/hero-image-holistay-min.png"
        alt="A beach view from a beachside-bungalow porch"
        className="w-full m-auto blur-xs relative"
      />
      <h1 className="absolute top-20 sm:top-40 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-bold text-white mx-auto">
        Discover Your Perfect Stay
      </h1>

      <h2 className="text-slate-900 text-xl font-semibold w-10/12 m-auto mt-5">
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
