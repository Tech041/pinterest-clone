import { useState } from "react";
import Image from "../../components/image/Image";
import "./UserProfile.css";
import Gallery from "../../components/gallery/Gallery";
import Boards from "../../components/boards/Boards";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { useParams } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserProfile = () => {
  const { username } = useParams();
  const [type, setType] = useState("created");

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () =>
      apiRequest.post(`/users/${username}`).then((res) => res.data),
  });
  if (isPending) return "Loading..";
  if (error) return "An error occurred " + error.message;
  if (!data) return "User not found!";
  console.log("User Data are:", data);

  return (
    <div className="profilePage">
      <Image
        path={data.img || "/general/noAvatar.png"}
        w={100}
        h={100}
        alt=""
        className="profileImg"
      />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername">{data.username}</span>
      <div className="followCount">
        {data.followerCount} followers . {data.followingCount} followings
      </div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" alt="" className="" />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>
        <Image path="/general/more.svg" alt="" className="" />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default UserProfile;
