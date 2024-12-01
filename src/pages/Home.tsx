import RenderVenuesHome from "../components/ui/RenderVenuesHome";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import SearchVenues from "../components/Search/SearchVenues";
import useMyStore from "../store";
import RegisterModal from "../components/ui/forms/modals/RegisterModal";

const Home: React.FC = () => {
  const { handleOpenRegister } = useMyStore();

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
      <SearchVenues />

      <h2 className="text-slate-900 w-8/12 text-xl font-semibold m-auto mt-5">
        A Tailored Experience
      </h2>

      <p className="text-slate-900 w-8/12 text-sm md:text-large m-auto mb-2">
        If you are looking for the ideal accommodation for your holiday, look no
        further, we’ve got you covered. Our services provide a global overview
        of available places to stay, with the option to choose between a wide
        range of different amenities of your liking.
      </p>
      <NavLink to="/venues">
        <div className="flex flex-row justify-end w-10/12">
          <button
            aria-label="Toggle Link To Venues"
            className="border-solid border-2 text-sm md:text-large px-2 py-1 md:px-5 md:py-2 m-2 shadow-md hover:shadow-2xl"
          >
            Go Explore
          </button>
        </div>
      </NavLink>

      <RenderVenuesHome />
      <div className="max-w-8/12 mx-auto container">
        <div className="w-fit mx-auto mb-20">
          <h3 className="text-slate-900 w-8/12 text-l font-semibold m-auto mt-10 mb-5 ">
            Do Like Diego, Become A HoliStay Venue Manager!
          </h3>

          <p className=" text-slate-900 w-8/12 text-sm md:text-large m-auto mb-2">
            Did you know that you could significantly boost your monthly income
            by renting out your venue? That’s exactly what Diego did!
          </p>
          <p className=" text-slate-900 w-8/12 text-sm md:text-large m-auto mb-2">
            When he inherited a jungle resort in Bali, he was unsure how to
            utilize all the space and pools. Fortunately, he discovered
            HoliStay, and before long, the resort was bustling with activity
            once again.
          </p>
          <button
            onClick={handleOpenRegister}
            aria-label="Toggle Open Registration"
            className="bg-white text-slate-900 float-right me-12 px-2 py-1 sm:px-6 sm:py-3 rounded-md text-xs sm:text-lg font-medium hover:shadow-2xl border shadow-md"
          >
            Register Now
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center flex-wrap">
          <img
            src="/assets/diego.jpg"
            alt="A man in a jungle setting, arms stretched into the sky"
            className="w-72 h-auto md:w-80 md:h-auto lg:w-96 lg:h-auto rounded-lg shadow-2xl mb-5 lg:mb-0"
          />

          <img
            src="/assets/jungle-bridge.jpg"
            alt="A woman crossing a bridge in a jungle-village setting"
            className="w-44 h-auto md:w-52 md:h-auto lg:w-60 lg:h-auto rounded-lg shadow-2xl mb-5 lg:mb-0 m-3"
          />
          <img
            src="/assets/jungle-room.jpg"
            alt="A woman sleeping in a hammock inside a room with a jungle view"
            className="w-44 h-auto md:w-52 md:h-auto lg:w-60 lg:h-auto rounded-lg shadow-2xl mb-5 lg:mb-0 m-3"
          />
          <img
            src="/assets/jungle-hut.jpg"
            alt="A tree hut in a jungle-village setting"
            className="w-44 h-auto md:w-52 md:h-auto lg:w-60 lg:h-auto rounded-lg shadow-2xl mb-5 lg:mb-0 m-3"
          />
        </div>
        <RegisterModal />
      </div>
    </>
  );
};

export default Home;
