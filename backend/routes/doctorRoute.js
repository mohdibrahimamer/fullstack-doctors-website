import express from "express";
import {
  doctorsList,
  doctorLogin,
  doctorAppointments,
  appointmentCompleted,
  cancelAppointment,
  doctorDashboard,
  doctorProfile,
  doctorProfileUpdate,
} from "../controllers/doctorController.js";

import { authDoctor } from "../middlewares/authDoctor.js";
import upload from "../middlewares/multer.js";
const doctorRouter = express.Router();
// yeh  route bina token ki rahete
doctorRouter.get("/doctors-list", doctorsList);
doctorRouter.post("/login", doctorLogin);

doctorRouter.get("/appointments-list", authDoctor, doctorAppointments);
doctorRouter.post("/appointment-completed", authDoctor, appointmentCompleted);

doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);

doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

doctorRouter.get("/profile", authDoctor, doctorProfile);

doctorRouter.post(
  "/update-profile",
  authDoctor,
  upload.single("image"),
  doctorProfileUpdate
);
export default doctorRouter;
