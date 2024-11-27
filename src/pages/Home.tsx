import React from "react";
import RenderVenuesHome from "../components/ui/RenderVenuesHome";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Holistay | Home</title>
        <meta
          name="description"
          content="Find the ideal accommodation for your holiday with Holistay. Explore a wide range of places to stay with various amenities."
        />
      </Helmet>
      <img
        src="assets/hero-image-holistay-min.png"
        alt="A beach view from a beachside-bungalow porch"
        className="w-full m-auto blur-xs relative rounded-3xl drop-shadow-2xl"
      />
      <h1 className="absolute top-20 sm:top-40 left-1/2 transform -translate-x-1/2 text-sm sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-bold text-white mx-auto">
        Discover Your Perfect Stay
      </h1>

      <h2 className="text-slate-900 w-8/12 text-xl font-semibold m-auto mt-5">
        A Tailored Experience
      </h2>

      <p className="text-slate-900 w-8/12 text-sm md:text-large m-auto mb-8">
        If you are looking for the ideal accommodation for your holiday, look no
        further, we’ve got you covered. Our services provide a global overview
        of available places to stay, with the option to choose between a wide
        range of different amenities of your liking.
      </p>
      <NavLink to="/venues">
        <div className="flex flex-row justify-end">
          <button className="border-solid border-2 text-sm md:text-large px-2 py-1 md:px-5 md:py-2 m-2 mr-5 shadow-md hover:shadow-2xl">
            Go Explore
          </button>
        </div>
      </NavLink>

      <RenderVenuesHome />
    </>
  );
};

export default Home;
