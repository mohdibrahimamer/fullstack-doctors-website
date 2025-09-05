// functionality working
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { connectCloudinary } from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
const PORT = 5000;

const app = express();
dotenv.config();

connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// yaha per endpoints use karey
app.use("/api/admin", adminRouter);
// localhost:5000/api/admin/add-doctor

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
