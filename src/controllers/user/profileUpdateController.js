import userModel from "../../models/userModel/userModel.js";

const profileUpdateController = async (req, res) => {
  try {
    const { name, email, phone, address, bio, gender, latitude, longitude } =
      req.body.profileData;
    const { image, id } = req.body;
    const fullAddress = {
      latitude: latitude,
      longitude: longitude,
      address: address,
    };
    const updateUser = await userModel.findByIdAndUpdate(id, {
      User_Address: fullAddress,
      User_Name: name,
      User_Email: email,
      User_Phone_Number: phone,
      User_Bio: bio,
      User_Gender: gender,
      User_Image: image,
    });
    if (updateUser) {
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updateUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Profile update failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default profileUpdateController;
