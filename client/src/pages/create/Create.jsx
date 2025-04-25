import { useNavigate } from "react-router-dom";
import IkImage from "../../components/image/Image";
import useAuthStore from "../../utils/authStore";
import "./Create.css";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/editor/editor";
import useEditorStore from "../../utils/editorStore";
import apiRequest from "../../utils/apiRequest";

const Create = () => {
  const { currentUser } = useAuthStore();
  const { textOptions, canvasOptions } = useEditorStore();
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);
  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
    // const previewImgURL = file ? URL.createObjectURL(file) : null;
  }, [file]);
  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      try {
        const res = await apiRequest.post("/pins", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
      } catch (error) {
        console.log("Error creating board", error);
      }
    }
  };
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Design your pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {isEditing ? (
        <Editor previewImg={previewImg} />
      ) : (
        <div className="createButton">
          {previewImg.url ? (
            <div className="preview">
              <img src={previewImg.url} className="" />
              <div
                className="editIcon"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                <IkImage
                  path="/general/edit.svg"
                  alt={"edit_icon"}
                  className={""}
                />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <IkImage path="/general/upload.svg" alt="" className="" />
                  <span className="">Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high quality .jpg files less than 200mb
                </div>
              </label>
              <input
                type="file"
                className=""
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
          <form className="createForm" ref={formRef}>
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
      )}
    </div>
  );
};

export default Create;
