import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Checkout(): React.ReactElement {
  return (
    <div className="border-solid border-2 border-slate-800 rounded-lg mt-40 w-10/12 mx-auto">
      <h1 className="m-12 font-normal text-2xl md:text-4xl lg:text-8xl text-center">
        Booking Succesful
      </h1>
      <p className="text-lg w-8/12 mx-auto mb-5">
        Your booking confirmation and receipt will be send to your email
        address. Please check your spam folder or contact our support services
        if you do not receive any email.
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
  );
}

export default Checkout;
