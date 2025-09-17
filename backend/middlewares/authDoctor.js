import jwt from "jsonwebtoken";
import "dotenv/config";
export const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "autth header not found",
      });
    }

    const doctorToken = authHeader.split(" ")[1];
    if (!doctorToken) {
      return res.status(400).json({
        success: false,
        message: "token not found",
      });
    }
    const decodedToken = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        message: "atoken is not valid",
      });
    }

    req.doctor = decodedToken;
    next();
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      success: false,
      message: `check auth doctor functionality ${error.message}`,
      error: error.message,
    });
  }
};
