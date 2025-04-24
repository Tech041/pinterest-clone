import "./GalleryItems.css";
import { Link } from "react-router-dom";
import Image from "../image/Image";

const GalleryItems = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width;
  return (
    <div
      className="galleryItems"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="item_images" className="" /> */}

      {/* IMAGE */}
      <Image src={item.media} alt={"images"} w={372} h={optimizedHeight} />

      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Image path="/general/share.svg" alt="" className="" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="" className="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItems;
