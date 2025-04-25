import express from "express";
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import connectDB from "./configs/mongodb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const allowedOrigins = [process.env.CLIENT_URL];
const app = express();

// Middelewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const port = process.env.PORT || 5000;
// Database connection
connectDB();

// Routes
app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);
app.use("/", (req, res) => {
  return res.json("API is Working");
});
app.listen(port, () => {
  console.log("Server running  on port", port);
});
