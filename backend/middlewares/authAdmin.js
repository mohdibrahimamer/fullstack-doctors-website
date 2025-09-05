import jwt from "jsonwebtoken";

// check this functionality
// yaha per admin ko check karey
export const authAdmin = async (req, res, next) => {
  try {
    // yaha per atoken k naam se variable declare karey
    const atoken = req.headers;
    // agar "token" nai hai
    if (!atoken) {
      res.status(400).json({
        success: false,
        message: "token not found",
      });
    }
    // agar "token" hai toh verify karey
    const jwt_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    //agar "verfied token" not same as "admin email and password generated token" hai toh
    if (jwt_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.status(400).json({
        success: false,
        message: "token not verified and not same as generated token",
      });
    }

    next();
  } catch (error) {
    console.log("error in authAdmin", error.message);
    res.status(400).json({
      success: false,
      message: "check authAdmin functionality",
      error: error.message,
    });
  }
};
