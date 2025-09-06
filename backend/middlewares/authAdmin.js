import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers;
    if (!atoken) {
      return res.status(400).json({
        success: false,
        message: "token not found check auth admin middleware",
      });
    }
    // yaha per "token_decode" k naam se varibale declare karey
    // yaha per decoding the token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    //  admin "email" aur "password" mien joh token genrate hua hain hai usko token_decode se check karey
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.status(200).json({
        success: true,
        message: "token invalid not generated",
      });
    }
    next();
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: "check auth admin middleware functionality",
    });
  }
};
