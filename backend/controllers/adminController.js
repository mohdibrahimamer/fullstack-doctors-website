// functionality working
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";

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
      doctor,
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

// check this functionality
// yaha per adminLogin functionality likhre
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // yaha per check karey "email" and "password" match hora kya
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // yaha per token k naam se variable declare karey
      // yaha per "email" aur "password" ko add kar k encrypt karey
      const token = jwt.sign(
        (email + password).toString(),
        process.env.JWT_SECRET
      );

      res
        .status(200)
        .json({ success: true, message: "Admin logged in", token });
    }

    res
      .status(400)
      .json({ success: false, message: "Invalid admin email or password" });

    //  yaha "email" unique hai isliye findOne({email}) use kary
    // const doctor = await doctorModel.findOne({ email });

    // if (!doctor) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid email or password" });
    // }

    // yaha per "password" compare karey
    // const isPasswordMatch = await bcrypt.compare(password, doctor.password);
    // if (!isPasswordMatch) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid password" });
    // }
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: "check admin login functionality",
      error: error.message,
    });
  }
};
