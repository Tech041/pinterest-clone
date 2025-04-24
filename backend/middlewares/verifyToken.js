import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not aunthenticated" });
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid",
      });
    }
    req.userId = payload.userId;
    next();
  });
};
