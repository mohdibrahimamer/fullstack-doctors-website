// yeh functionality file mien isliye likhre kyun ki
// yeh  "change availability" ka function dono use hora
// "admin panel" aur "doctor panel" mien

import doctorModel from "../models/doctorModel.js";
// yaha per change avaliability k  naam se function likhre

// yeh "changeAvailability" ka functionality work nai kari
// yeh "changeAvailability" ka functionality work nai kari
// yeh "changeAvailability" ka functionality work nai kari
export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    console.log(req.body);

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "docId is required in the request body",
      });
    }

    const docdata = await doctorModel.findById(docId);
    console.log("docdata", docdata);

    // yaha per changing by using "findByIdAndUpdate"
    await doctorModel.findByIdAndUpdate(docId, {
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
