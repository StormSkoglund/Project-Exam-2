import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

function Layout(): React.ReactElement {
  return (
    <>
      <Header />
      <div className="h-screen flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
