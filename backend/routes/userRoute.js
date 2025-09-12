import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();
const app = express();
userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

app.use(express.json());
userRouter.get("/profile", verifyToken, getProfile);

userRouter.post(
  "/update-profile",
  upload.single("image"),
  verifyToken,
  updateProfile
);

userRouter.post("/book-appointment", verifyToken, bookAppointment);
userRouter.get("/my-appointment", verifyToken, listAppointments);
userRouter.post("/cancel-appointment", verifyToken, cancelAppointment);
export default userRouter;
