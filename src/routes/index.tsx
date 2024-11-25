import { createBrowserRouter } from "react-router-dom";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Error from "../pages/ErrorRedirect";
import Home from "../pages/Home";
import VenuePage from "../pages/VenuePage";
import ProfileCustomer from "../pages/ProfileCustomer";
import ProfileManager from "../pages/ProfileManager";
import Booking from "../pages/Booking";
import Venues from "../pages/Venues";
import Layout from "../components/ui/Layout";
import AdminPortal from "../pages/AdminPortal";

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
        path: "booking/:venueId",
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
        path: "adminportal",
        element: <AdminPortal />,
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
