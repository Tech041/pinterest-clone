import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Follow from "../models/follow.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, displayName, email, password } = req.body;
    if (!username || !displayName || !email || !password) {
      return res.json({ success: false, message: "Incomplete credentials" });
    }
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed) {
      return res.json({ success: false, message: "Email has been used" });
    }
    const newHashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      displayName,
      hashedPassword: newHashedPassword,
      email,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();
    return res.status(201).json({
      success: true,
      message: "User registration successful",
      detailsWithoutPassword,
    });
  } catch (error) {
    console.log("Error registering user:", error);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password are required",
      });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({ success: false, message: "No user found" });
    }
    const user = userExists;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invaid Passowrd" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();
    return res.json({
      success: true,
      message: "Login successful",
      detailsWithoutPassword,
    });
  } catch (error) {
    console.log("Error logging in user:", error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("Error logging out user:", error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();
    const followerCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });

    // Verify if authenticated
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({
        ...detailsWithoutPassword,
        followerCount,
        followingCount,
        isFollowing: false,
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          const isExists = await Follow.exists({
            follower: payload.userId,
            following: user._id,
          });
          return res.status(200).json({
            ...detailsWithoutPassword,
            followerCount,
            followingCount,
            isFollowing: isExists ? true : false,
          });
        }
      });
    }
  } catch (error) {
    console.log("Error fetching user:", error);
  }
};

export const followUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    const isFollowing = await Follow.exists({
      follower: req.userId,
      following: user._id,
    });
    if (isFollowing) {
      await Follow.deleteOne({
        follower: req.userId,
        following: user._id,
      });
    } else {
      await Follow.create({
        follower: req.userId,
        following: user._id,
      });
    }

    return res.status(201).json({ success: true, message: "Successfull" });
  } catch (error) {
    console.log("Error following  user:", error);
  }
};
