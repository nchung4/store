import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="w-container py-20">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
