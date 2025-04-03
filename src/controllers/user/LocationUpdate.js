import userModel from "../../models/userModel/userModel.js";
const LocationUpdate = async (req, res) => {
  try {
    const { address, userProfile } = req.body;
    const user = await userModel.findByIdAndUpdate(userProfile, {
      User_Address: address,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default LocationUpdate;
