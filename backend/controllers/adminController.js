// functionality working
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// yaha per "addDoctor" function likhrey
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      phone,
      date,
    } = req.body;
    const imageFile = req.file;

    // console.log(
    //   {
    //     name,
    //     email,
    //     password,
    //     speciality,
    //     degree,
    //     experience,
    //     about,
    //     available,
    //     fees,
    //     address,
    //     phone,
    //     date,
    //   },
    //   imageFile
    // );
    // agar "name , email etc" data nai hai toh
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !available ||
      !fees ||
      !address ||
      !phone ||
      !date
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // // checking email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // // checking password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // // "password" store karye aur encrypt karey
    // yaha per "salt" generate karey to encrypt password
    const salt = await bcrypt.genSalt(10);
    // // yaha per "hashedpassword" variable declare karey
    const hashedPassword = await bcrypt.hash(password, salt);

    // yaha per uploading image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    // yaha per "doctorData" banarey
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      phone,
      date: Date.now().toString(),
    };

    // saving the data "doctorData" in the database
    const newDoctor = await doctorModel(doctorData);
    await newDoctor.save();
    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: "check add doctor functionality",
      error: error.message,
    });
  }
};

// yaha per admin login functionality likhre
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // yaha per "atoken" variable declare karey
      const atoken = jwt.sign(email + password, process.env.JWT_SECRET);
      console.log("atoken from amdin control", atoken);
      return res.status(200).json({
        success: true,
        message: "Admin login successfully",
        token: atoken,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Admin login failed",
      });
    }
  } catch (error) {
    console.log("error in admin login functionality", error);
    res.status(400).json({
      success: false,
      message: "check admin login functionality",
      error: error.message,
    });
  }
};

// yaha api for getting all doctors list ki functionality likhre
export const getAllDoctors = async (req, res) => {
  //
  try {
    // yaha per ".select('-password')" use karey to hide password
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: "check get all doctors functionality",
      error: error.message,
    });
  }
};

// api for getting all the appointment list
export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: "check appointment list functionality",
      error: error.message,
    });
  }
};

// writing an api for admin appointment cancellation

export const adminCancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // yaha per appointmentdata ko find karte
    const appointmentData = await appointmentModel.findById(appointmentId);

    // yaha per "cancell appointment" ko "true" kare joh appointment database mien hai
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });

    // yaha per realsing and removing  the doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    // finding the doctor by id
    const doctorData = await doctorModel.findById(docId);
    // extracting the slots booked data
    let slot_booked = doctorData.slots_booked;

    if (slot_booked[slotDate]) {
      // removing the cancelled slot
      slot_booked[slotDate] = slot_booked[slotDate].filter(
        (time) => time !== slotTime
      );

      // updating the slots_booked data
      await doctorModel.findByIdAndUpdate(docId, { slots_booked: slot_booked });

      res.status(200).json({
        success: true,
        message: "removed the slot from the doctor model also successfully",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check cancel appointment functionality: ${error.message}`,
      error: error.message,
    });
  }
};

// writing an api to get all the data to the admin dashboard

export const adminDashboard = async (req, res) => {
  try {
    // meri nazar doctors data aur users  data fetch karey
    const doctors = await doctorModel.find({}).select("-password");
    const users = await userModel.find({}).select("-password");
    const appointments = await appointmentModel.find({});
    // yaha per dashboardData ka object banayey
    const dashboardData = {
      // sending the length of the doctors, users, appointments
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      // yaha per latest appointnment show karey in order of 5
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashboardData,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check admin dashboard functionality: ${error.message}`,
      error: error.message,
    });
  }
};
