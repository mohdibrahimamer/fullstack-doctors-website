// functionality working
import express from "express";
import { addDoctor,adminLogin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/authAdmin.js";
const adminRouter = express.Router();
// sending the form data at the endpoint with image
adminRouter.post("/add-doctor",authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login",adminLogin)
export default adminRouter;
