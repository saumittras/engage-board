import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>{/* <Footer></Footer> */}</footer>
    </div>
  );
};

export default Main;
