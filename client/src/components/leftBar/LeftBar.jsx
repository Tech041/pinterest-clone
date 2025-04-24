import Image from "../image/Image";
import "./LeftBar.css";
import { Link } from "react-router-dom";
const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" alt="Logo" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/home.svg" alt="Home" className="" />
        </Link>
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="Create_icon" className="" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="update_icon" className="" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image
            path="/general/messages.svg"
            alt="messages_icon"
            className=""
          />
        </Link>
      </div>
      <Link to="/" className="menuIcon">
        <Image path="/general/settings.svg" alt="settings_icon" className="" />
      </Link>
    </div>
  );
};

export default LeftBar;
