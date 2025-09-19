// yeh functionality file mien isliye likhre kyun ki
// yeh  "change availability" ka function dono use hora
// "admin panel" aur "doctor panel" mien

import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";
// yaha per change avaliability k  naam se function likhre

// yeh "changeAvailability" ka functionality work nai kari
// yeh "changeAvailability" ka functionality work nai kari
// yeh "changeAvailability" ka functionality work nai kari
export const changeAvailability = async (req, res) => {
  try {
    // yaha per req.doctor.id use karey
    const { doctorId } = req.body;
    console.log(req.body);

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "doctorId is required in the request body",
      });
    }

    const docdata = await doctorModel.findById(doctorId);
    console.log("docdata", docdata);

    // yaha per changing by using "findByIdAndUpdate"
    await doctorModel.findByIdAndUpdate(doctorId, {
      available: !docdata.available,
    });

    res.status(200).json({
      success: true,
      message: "Availability changed successfully",
    });

    //  yaha per doctor model use karey
    // phir doctor model ki avaliable propertiy access karte
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check change availability ${error.message} functionality`,
      error: error.message,
    });
  }
};

// yaha per "doctorsList" ka functionality likhre proper work kari
// yah per doctorslist ki functionality likhre
export const doctorsList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check get doctorsList functionality ${error.message} `,
      error: error.message,
    });
  }
};

// yaha per login doctor k liye api likhre
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // yaha per "user" k naam se variable banarey
    const doctor = await doctorModel.findOne({ email });

    // yaha agar user nai hai toh
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "doctor not found",
      });
    }
    //  yaha per "isMatch" k naam se variable banare
    // phir passwords compare "usermodel" se aur "user" se
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      // yaha per "user_id" say "token decode" hota middleware "userAuth" mien
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      console.log("token", token);
      res.status(200).json({
        success: true,
        message: "doctor login successfully",
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "doctor login failed",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check doctor login functionality ${error.message} `,
      error: error.message,
    });
  }
};

// api for getting an appointmentData for doctor panel
export const doctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.doctor.id;
    const appointmentData = await appointmentModel.find({ doctorId });
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointmentData,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check doctor appointmentData functionality ${error.message} `,
      error: error.message,
    });
  }
};

// yaha per writing an api for appointment completed
export const appointmentCompleted = async (req, res) => {
  try {
    const { doctorId } = req.doctor.id;
    const { appointmentId } = req.body;
    // yeh appointmentmodel fetch by appointment id se
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId == doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.status(200).json({
        success: true,
        message: "Appointment completed successfully",
        appointmentData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "unauthorized action not allowed to complete the appointment",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check appointment completed functionality ${error.message} `,
      error: error.message,
    });
  }
};

// yaha per writing an api for cancelling appointment for doctor panel
export const cancelAppointment = async (req, res) => {
  try {
    const { doctorId } = req.doctor.id;
    const { appointmentId } = req.body;
    // appointmodel use karte
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.doctorId == doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.status(200).json({
        success: true,
        message: "Appointment cancelled successfully",
        appointmentData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "unauthorized action not allowed to cancel the appointment",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check cancel appointment functionality ${error.message} `,
      error: error.message,
    });
  }
};

// yaha per api to get dashboard data for doctor panel
export const doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.doctor.id;
    const appointmentData = await appointmentModel.find({ doctorId });
    // yaha per "earning" k naam se variable banarey
    let earnings = 0;
    appointmentData.map((appointment) => {
      if (appointment.isCompleted || appointment.payment) {
        // add "payment" in earnings
        earnings += appointment.amount;
      }
    });
    // yaha per patients k naams se variable banarey
    let patients = [];
    appointmentData.map((appointment) => {
      // agar doctorId not in patients array mien hai to push karey
      if (!patients.includes(appointment.doctorId)) {
        patients.push(appointment.doctorId);
      }
    });

    // yaha per dashData k naams se object banarey
    const dashData = {
      earnings,
      appointmentData: appointmentData.length,
      patients,
      latestAppointments: appointmentData.reverse().slice(0, 5),
    };
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashData,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check doctor dashboard functionality ${error.message} `,
      error: error.message,
    });
  }
};

// api to get the doctor profile
export const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.doctor.id;
    const doctorsData = await doctorModel
      .find({ doctorId })
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor profile fetched successfully",
      doctorsData,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check doctor profile functionality ${error.message} `,
      error: error.message,
    });
  }
};

// api for updating the doctors profile
export const doctorProfileUpdate = async (req, res) => {
  try {
    // agar kisi bhi function mein "const doctorId = req.doctor.id" use karey toh hamesha individual user ko access asia hi declare karna

    // const doctorId = req.doctor.id;
    // kyun already "doctorId" avaliable hai body mien
    const {
      doctorId,
      name,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      phone,
      address,
    } = req.body;

    // yaha per "imageFile" variable banare
    const imageFile = req.file;
    if (!name || !speciality || !degree || !experience || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required please fill the updated user form",
      });
    }
    // YAHA PER USER KI PROFILE UPDATE KAREY
    await doctorModel.findByIdAndUpdate(doctorId, {
      name,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address: address,
      phone,
    });

    if (imageFile) {
      // uploading image to cloudinary
      const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = uploadImage.secure_url;
      //  yaha per image update karey
      await doctorModel.findByIdAndUpdate(doctorId, {
        image: imageUrl,
      });
    }
    res.status(200).json({
      success: true,
      message: "doctors profile updated successfully",
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check doctor profile update functionality ${error.message} `,
      error: error.message,
    });
  }
};
