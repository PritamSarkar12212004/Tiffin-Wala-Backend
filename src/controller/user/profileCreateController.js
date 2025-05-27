import userModel from "../../model/userModel/userModel.js";
const profileCreateController = async (req, res) => {
  try {
    const { username, email, gender, bio, location } = req.body.profileData;
    const { image, phone } = req.body;
    const fullAddress = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.fullAddress,
    };
    const findData = await userModel.findOne({ User_Phone_Number: phone });
    if (findData) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const userData = await userModel.create({
      User_Name: username ? username : null,
      User_Email: email ? email : null,
      User_Gender: gender ? gender : null,
      User_Bio: bio ? bio : null,
      User_Phone_Number: phone ? phone : null,
      User_Image: image ? image : null,
      User_Address: fullAddress ? fullAddress : null,
    });
    res.status(200).json({
      success: true,
      message: "Profile created successfully",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default profileCreateController;
