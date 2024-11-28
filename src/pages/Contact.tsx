import { Helmet } from "react-helmet-async";

function Contact(): React.ReactElement {
  return (
    <div>
      <Helmet>
        <title>Holistay | Contact Us</title>
        <meta
          name="description"
          content="Get in touch with Holistay for any inquiries or support. We're here to help you find your perfect stay."
        />
      </Helmet>
      <h1 className="mt-40 text-5xl text-center">Contact</h1>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <img
              src="/assets/pexels-mart-production-7709287-min.jpg"
              alt="Contact"
              className="w-full h-auto object-cover rounded-md shadow-lg"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="mt-2">Phone: +47 123 45 678</p>
              <p>Email: support@holistay.no</p>
              <p>Address: Example Street 123, 0123 Oslo, Norway</p>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <h2 className="text-2xl font-bold">About Us</h2>
            <p className="mt-2">
              Welcome to holiStay, your trusted platform for renting out and
              booking unique venues, apartments, and rooms. Whether you're a
              venue manager looking to maximize your property's potential or a
              customer searching for the perfect place to stay, we've got you
              covered.
            </p>
            <h3 className="text-xl font-semibold mt-4">For Venue Managers</h3>
            <p className="mt-2">
              As a venue manager, you will receive a customized admin profile
              with tools for setting up rental solutions for your properties.
              Our platform allows you to easily manage bookings, communicate
              with guests, and optimize your rental strategy to ensure maximum
              occupancy and satisfaction.
            </p>
            <h3 className="text-xl font-semibold mt-4">For Customers</h3>
            <p className="mt-2">
              Looking for a place to stay? Our platform offers a wide range of
              options, from cozy rooms to luxurious venues. Browse through our
              listings, read reviews, and book your perfect stay with just a few
              clicks. We are committed to providing a seamless and enjoyable
              booking experience.
            </p>
            <h3 className="text-xl font-semibold mt-4">
              Renting Out Your Property
            </h3>
            <p className="mt-2">
              Have a room, apartment, or venue to rent out? Join our community
              of hosts and start earning today. Our user-friendly interface
              makes it easy to list your property, set your availability, and
              manage bookings. We provide all the tools you need to succeed as a
              host.
            </p>
            <h3 className="text-xl font-semibold mt-4">Legal Information</h3>
            <p className="mt-2">
              By using our platform, you agree to our terms and conditions. We
              are committed to protecting your privacy and ensuring a safe and
              secure experience for all users. Please review our privacy policy
              for more information.
            </p>
            <h3 className="text-xl font-semibold mt-4">Disclaimer</h3>
            <p className="mt-2">
              This website is a project for an exam. The phone numbers and
              addresses provided are AI-generated and not real. Please do not
              attempt to contact these numbers or visit these addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
