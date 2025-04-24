import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ pin: postId })
      .populate("user", "username img displayName")
      .sort({
        createdAt: -1,
      });
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error getting commnets: ", error);
  }
};

export const addComment = async (req, res) => {
  try {
    const { description, pin } = req.body;
    const userId = req.userId;
    const comment = await Comment.create({
      description,
      pin,
      user: userId,
    });
    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.log("Error getting commnets: ", error);
  }
};
