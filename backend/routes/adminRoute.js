// functionality working

import express from "express";
import {
  addDoctor,
  adminLogin,
  getAllDoctors,
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express.Router();
// sending the form data at the endpoint with image
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
// yaha per "getAllDoctors" ka route likhre
adminRouter.get("/get-doctors", authAdmin, getAllDoctors);
// yaha per "changeAvailability" ka route likhre
adminRouter.post("/change-availability", authAdmin, changeAvailability);

export default adminRouter;
