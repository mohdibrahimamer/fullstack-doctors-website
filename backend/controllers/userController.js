import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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
