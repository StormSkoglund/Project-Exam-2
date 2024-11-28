import { Helmet } from "react-helmet-async";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMyStore from "../store";

function Checkout(): React.ReactElement {
  const user = useMyStore((state) => state.user);
  const emailAddress = user?.email;

  return (
    <>
      <Helmet>
        <title>Holistay | Booking Success</title>
        <meta
          name="description"
          content="Your Holistay booking was a success."
        />
      </Helmet>
      <div className="border-solid border-2 border-slate-800 rounded-lg mt-40 w-10/12 mx-auto">
        <h1 className="m-12 font-normal text-2xl md:text-4xl lg:text-8xl text-center">
          Booking Successful
        </h1>
        <p className="text-lg w-6/12 mx-auto">
          Your booking confirmation and receipt will be sent to your email
          address:
        </p>
        <p className="text-lg w-6/12 mx-auto text-theme-blue">{emailAddress}</p>
        <p className="text-lg w-6/12 mx-auto mb-5">
          Please check your spam folder or contact our support services if you
          do not receive any email.
        </p>
        <div>
          <Link to="/">
            <FaHome className="text-2xl text-center mx-auto text-theme-blue hover:text-theme-green" />
            <p className="text-center block font-bolder text-2xl px-2 py-3 hover:text-theme-blue">
              Keep Exploring
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Checkout;
