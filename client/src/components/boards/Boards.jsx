import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Image from "../image/Image";
import "./Boards.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });
  if (isPending) return "Loading..";
  if (error) return "An error occurred " + error.message;
  if (!data) return "User not found!";
  console.log("Board data are:", data);
  return (
    <div className="collections">
      {/* Collection */}
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          key={board._id}
          className="collection"
        >
          <Image src={board.firstPin.media} alt="" className="" />
          <div className="collectionInfo">
            <h1 className="">{board.title}</h1>
            <span className="">
              {board.pinCount} Pins. {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
