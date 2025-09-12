import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import upload from "../middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
// api to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "missing details",
      });
    }

    // validator email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "enter the valid email",
      });
    }
    //  yaha per checking the password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "password must be at least 8 characters long",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    // yaha per password encrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // yaha per user data banarey
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await userModel.create(userData);
    // yaha per saving the "user data" in the  database
    // yaha per token k naam se variable create karey
    await newUser.save();

    // yaha per "token" k naam se varible banare
    // yaha per "user_id" pass karey
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "user registered successfully",
      token,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check registered user functionality ${error.message} `,
      error: error.message,
    });
  }
};

// working properly
// yaha per loginUser ki functionallity likhre
export const loginUser = async (req, res) => {
  try {
    // yaha per email password
    const { email, password } = req.body;
    // yaha per "user" k naam se variable banarey
    const user = await userModel.findOne({ email });

    // yaha agar user nai hai toh
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    //  yaha per "isMatch" k naam se variable banare
    // phir passwords compare "usermodel" se aur "user" se
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // yaha per "user_id" say "token decode" hota middleware "userAuth" mien
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log("token", token);
      res.status(200).json({
        success: true,
        message: "user login successfully",
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "user login failed",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check login user functionality ${error.message} `,
      error: error.message,
    });
  }
};

// yaha per working properly
// yaha per api to get user profile
// yaha per  user profile ki functionality likhre
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Correct: req.user is an object, not destructuring
    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      userData,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check get profile functionality: ${error.message}`,
    });
  }
};

// yaha per api to update the controller function
// yaha per update profile ki functionality likhre
export const updateProfile = async (req, res) => {
  try {
    // agar kisi bhi function mein "const userId = req.user.id" use karey toh hamesha individual user ko access asia hi declare karna

    const userId = req.user.id;
    const { name, address, gender, dob, phone } = req.body;

    // yaha per "imageFile" variable banare
    const imageFile = req.file;
    console.log(name, address, gender, dob, phone, imageFile);
    if (!name || !address || !gender || !dob || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required please fill the updated user form",
      });
    }
    // YAHA PER USER KI PROFILE UPDATE KAREY
    await userModel.findByIdAndUpdate(userId, {
      name,
      address: address,
      gender,
      dob,
      phone,
    });

    if (imageFile) {
      // uploading image to cloudinary
      const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = uploadImage.secure_url;
      //  yaha per image update karey
      await userModel.findByIdAndUpdate(userId, {
        image: imageUrl,
      });
    }
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });

    console.log(name, address, gender, dob, phone, imageFile);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check update profile functionality: ${error.message}`,
      error: error.message,
    });
  }
};

// yaha per wrting an api to book the doctors appointment
// yeh appointment user ko show karte
export const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    // yaha per model mien se leyre
    const { docId, slotDate, slotTime } = req.body;
    // yaha per "docData" ek varibale banara
    // yhaa per data "doctorModel" se layre
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available",
      });
    }

    // yaha per slots_booked naam se varibale banare

    let slots_booked = docData.slots_booked;

    // checking for the availability of the slot
    // agar yeh date pe slot available nai hai
    if (slots_booked[slotDate]) {
      // if the time is already avaliable then throw an error
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          success: false,
          message: "Slot is already booked",
        });
      } else {
        // if theslots is not booked at that time
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      // if nobody  booked the appointment creating slot time for the booking
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // getting the id from the user data
    const userData = await userModel.findById(userId).select("-password");
    // after booking the appointment "slots.booked"  ki no need
    // user ko show nai  karna doctor k appointment kitne book hue so
    delete docData.slots_booked;

    // yaha per appointment data banarey
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee || 0,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    // saving the "new_slots" data in "docdata"
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });
    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      newAppointment,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check book appointment functionality: ${error.message}`,
      error: error.message,
    });
  }
};

// api for getting "user appointments"
export const listAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentModel.find({ userId });
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check user appointments functionality: ${error.message}`,
      error: error.message,
    });
  }
};

// yaha per  "cancel appointment" ki api likhre
// yeh api not working please check
// yeh api not working please check
// yeh api not working please check
// yeh api not working please check
// yeh api not working please check
// yeh api not working please check
export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;
    console.log("appointmentId", appointmentId);
    // yaha per "appointment data" k naam se variable banare
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log("found appointment", appointmentData);
    //  yaha per verifying the appointment user
    if (!appointmentData.userId !== userId) {
      return res.status(400).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // yaha per  "doctor slot" ka appointment remove hora
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    // extracting the slots
    let slots_booked = doctorData.slots_booked;
    // removing the slot
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );

    // saving the "new_slots" data in "docdata"
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });
    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: `Check cancel appointment functionality: ${error.message}`,
      error: error.message,
    });
  }
};
