import jwt from "jsonwebtoken";
// yeh functionality working

// yaha per chat gpt se functionality likhre
export const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "autth header not found",
      });
    }

    const atoken = authHeader.split(" ")[1];
    if (!atoken) {
      return res.status(400).json({
        success: false,
        message: "atoken not found",
      });
    }

    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        message: "atoken is not valid",
      });
    }
    req.admin = decodedToken.admin;
    next();
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      success: false,
      message: "check auth admin middleware functionality",
    });
  }
};
