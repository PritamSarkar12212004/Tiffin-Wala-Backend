import userModel from "../../model/userModel/userModel.js";
const profileLoginController = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log(phone);
    const findData = await userModel.findOne({ User_Phone_Number: phone });
    if (findData) {
      return res.status(200).json({
        success: true,
        message: "Profile login successfully",
        data: findData,
      });
    }
    res.status(400).json({
      success: false,
      message: "User Not exists",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default profileLoginController;
