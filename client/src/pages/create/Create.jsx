import { useNavigate } from "react-router-dom";
import Image from "../../components/image/Image";
import useAuthStore from "../../utils/authStore";
import "./Create.css";
import { useEffect, useState } from "react";

const Create = () => {
  const { currentUser } = useAuthStore();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="createButton">
        <label htmlFor="file" className="upload">
          <div className="uploadTitle">
            <Image path="/general/upload.svg" alt="" className="" />
            <span className="">Choose a file</span>
          </div>
          <div className="uploadInfo">
            We recommend using high quality .jpg files less than 200mb
          </div>
        </label>
        <input type="file" className="" id="file" hidden />
        <form className="createForm">
          <div className="createFormItem">
            <label htmlFor="title" className="">
              Title
            </label>
            <input
              type="text"
              className=""
              placeholder="Add a title"
              name="title"
              id="title"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="description" className="">
              Description
            </label>
            <textarea
              rows={6}
              type="text"
              className=""
              placeholder="Add a detailed description"
              name="description"
              id="description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="link" className="">
              Link
            </label>
            <input
              type="text"
              className=""
              placeholder="Add a Link"
              name="link"
              id="link"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="board" className="">
              Board
            </label>
            <select name="board" id="board" className="">
              <option value="" className="">
                Choose a board
              </option>
              <option value="1" className="">
                Board 1
              </option>{" "}
              <option value="2" className="">
                Board 2
              </option>
              <option value="3" className="">
                Board 3
              </option>
            </select>
          </div>
          <div className="createFormItem">
            <label htmlFor="tags" className="">
              Tagged topics
            </label>
            <input
              type="text"
              className=""
              placeholder="Add tags"
              name="tags"
              id="tags"
            />
            <small>Don&apos;t worry people won&apos;t see your tags</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
