import { Link } from "react-router-dom";

function Checkout(): React.ReactElement {
  return (
    <div>
      <h1>Checkout</h1>
      <div className="text-center">
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
