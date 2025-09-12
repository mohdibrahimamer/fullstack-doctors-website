// functionality working
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { connectCloudinary } from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";
const PORT = 5000;

const app = express();
dotenv.config();

connectDB();
connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// yaha per endpoints use karey
app.use("/api/admin", adminRouter);
// localhost:5000/api/admin
app.use("/api/doctor", doctorRouter);
// localhost:5000/api/doctor
app.use("/api/user", userRouter);
// localhost:5000/api/user

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
