import express from "express";
import { doctorsList } from "../controllers/doctorController.js";
const doctorRouter = express.Router();
// yeh  route bina token ki rahete
doctorRouter.get("/doctors-list", doctorsList);

export default doctorRouter;
