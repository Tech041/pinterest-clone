import Image from "../image/Image";
import "./PostInteractions.css";

const PostInteractions = () => {
  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <Image path="/general/react.svg" alt="" className="" />
        273
        <Image path="/general/share.svg" alt="" className="" />
        <Image path="/general/more.svg" alt="" className="" />
      </div>
      <button className="">Save</button>
    </div>
  );
};

export default PostInteractions;
