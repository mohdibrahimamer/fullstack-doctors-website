import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

export const getAllDoctors = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
    });
  } catch (error) {
    console.log("error in getAllDoctors", error);
    return res.status(500).json({
      success: false,
      message: "all doctors are not fetched Internal Server Error",
    });
  }
};
