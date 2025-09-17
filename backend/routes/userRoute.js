import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentAppointment,
  verifyRazorPayment,
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
// yaha per functionaltiy not working
userRouter.post("/cancel-appointment", verifyToken, cancelAppointment);
// yeh api baad mien check karo
userRouter.post("/payment-appointment", verifyToken, paymentAppointment);

userRouter.post("/verify-payment", verifyToken, verifyRazorPayment);
export default userRouter;
