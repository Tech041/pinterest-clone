import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CommentForm = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const addComment = async (comment) => {
    const res = await apiRequest.post("/comments", comment);
    return res.data;
  };
  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      setDesc("");
      setOpen(false);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutation.mutate({
        description: desc,
        pin: id,
      });
    } catch (error) {
      console.log("Error submitting comment", error);
    }
  };
  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={desc}
        className=""
        placeholder="Add a comment"
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="emoji">
        <div onClick={() => setOpen((prev) => !prev)} className="">
          😊
        </div>
        {open && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
