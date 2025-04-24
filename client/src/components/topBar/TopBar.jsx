import UserButton from "../userButton/UserButton";
import "./TopBar.css";
import Image from "../image/Image";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="topBar">
      {/* Search */}
      <form onSubmit={handleSubmit} className="search">
        <Image path="/general/search.svg" alt="search_input" className="" />
        <input type="text" placeholder="Search" className="" />
      </form>
      {/* User Info */}
      <UserButton />
    </div>
  );
};

export default TopBar;
