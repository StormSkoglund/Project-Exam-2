import { createBrowserRouter } from "react-router-dom";
import Checkout from "../pages/BookingCheckout";
import Contact from "../pages/Contact";
import CreateVenue from "../pages/CreateVenue";
import Error from "../pages/ErrorRedirect";
import Home from "../pages/Home";
import VenuePage from "../pages/VenuePage";
import ProfileCustomer from "../pages/ProfileCustomer";
import ProfileManager from "../pages/ProfileManager";
import Booking from "../pages/Booking";
import Venues from "../pages/Venues";
import Layout from "../components/ui/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "venuepage/:id",
        element: <VenuePage />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "createvenue",
        element: <CreateVenue />,
      },
      {
        path: "venues",
        element: <Venues />,
      },
      {
        path: "profilecustomer",
        element: <ProfileCustomer />,
      },
      {
        path: "profilemanager",
        element: <ProfileManager />,
      },
    ],
  },
]);

export { router };
