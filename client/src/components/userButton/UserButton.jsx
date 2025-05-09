import { useState } from "react";
import "./UserButton.css";
import Image from "../image/Image";
import apiRequest from "../../utils/apiRequest";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../utils/authStore";

const UserButton = () => {
  const { currentUser, removeCurrentUser } = useAuthStore();
  console.log("Current user:", currentUser);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // Temp user
  // const currentUser = true
  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/users/auth/logout", {});
      if (res.data.success) {
        toast.success(res.data.message);
        removeCurrentUser();
        navigate("/auth");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error logging out ", error);
      toast.error(error.message);
    }
  };

  return currentUser ? (
    <>
      <div className="userButton">
        <Image
          path={currentUser.img || "/general/noAvatar.png"}
          alt="no_avatar_icon"
          className=""
        />
        <div className="" onClick={() => setOpen((prev) => !prev)}>
          <Image
            path="/general/arrow.svg"
            alt="no_avatar_icon"
            className="arrow"
          />
        </div>
        {open && (
          <div className="userOptions">
            <Link
              to={`/profile/${currentUser.username}`}
              className="userOption"
            >
              Profile
            </Link>
            <div className="userOption">Setting</div>
            <div onClick={handleLogout} className="userOption">
              Logout
            </div>
          </div>
        )}
      </div>
      {/* For mobile */}
      <div onClick={handleLogout} className="mobileLogout">
        Logout
      </div>
    </>
  ) : (
    <Link to={"/auth"} className="loginLink">
      Login
    </Link>
  );
};

export default UserButton;
