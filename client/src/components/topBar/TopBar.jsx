import UserButton from "../userButton/UserButton";
import "./TopBar.css";
import Image from "../image/Image";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { CiHome } from "react-icons/ci";

const TopBar = () => {
  const [open, setOpen] = useState(false);
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
      <div onClick={() => setOpen((prev) => !prev)} className="icon ">
        {open ? (
          <IoCloseSharp size={30} color="black" />
        ) : (
          <GiHamburgerMenu size={30} color="red" />
        )}
      </div>
      {/* Mobile buttons */}
      <div className={`mobileButtons ${open ? "open" : "close"}`}>
        <ul className="">
          <li onClick={() => setOpen((prev) => !prev)} className="">
            <CiHome size={30} color=" gray" />
            <Link to={"/home"}>
              <span>Home</span>
            </Link>
          </li>
          <li onClick={() => setOpen((prev) => !prev)} className="">
            <MdCreateNewFolder size={30} color="gray" />
            <Link to={"/create"}>
              <span>Create</span>
            </Link>
          </li>

          {/* <li onClick={() => setOpen((prev) => !prev)} className="">
            <Image
              path="/general/settings.svg"
              alt="settings_icon"
              className=""
            />
            <Link to={"/auth"}>
              <span>Login</span>
            </Link>
          </li>  */}
        </ul>
        {/* mobile userButton */}
        <div className="mobileBtn">
          <UserButton />
        </div>
      </div>
      {/* User Info */}
      <div className="userButton">
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
