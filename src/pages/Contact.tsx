import { Link } from "react-router-dom";

function Contact(): React.ReactElement {
  return (
    <div>
      <h1>Contact</h1>
      <div className="text-center">
        Return{" "}
        <Link to="/">
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default Contact;
