import LeftBar from "../../components/leftBar/LeftBar";
import TopBar from "../../components/topBar/TopBar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
